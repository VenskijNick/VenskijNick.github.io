ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
            center: [53.861021, 27.492966],
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true
        });
    ymaps.borders.load('001', {
        lang: 'ru',
        quality: 2
    }).then(function (result) {

        //скрытие всего мира, кроме заданной страны
        var background = new ymaps.Polygon([
            [
                [85, -179.99],
                [85, 179.99],
                [-85, 179.99],
                [-85, -179.99],
                [85, -179.99]
            ]
        ], {}, {
            fillColor: '#FFFAF0',
            strokeWidth: 0,
            coordRendering: 'straightPath'
        });

        //нахождение страны по ее iso коду
        var region = result.features.filter(function (feature) {
            return feature.properties.iso3166 == 'BY';
        })[0];

        //добавление координат страны в многоугольник, который скрывает весь мир
        var masks = region.geometry.coordinates;
        masks.forEach(function (mask) {
            background.geometry.insert(1, mask);
        });

        //добавление многоугольника на карту
        myMap.geoObjects.add(background);
    })
    // Создадим 5 пунктов выпадающего списка.
    var listBoxItems = ['Красота', 'Администрация', 'Магазины', 'Еда', 'Здоровье', 'Просвещение', 'Образование', 'Отдых', 'Профком']
            .map(function (title) {
                return new ymaps.control.ListBoxItem({
                    data: {
                        content: title
                    },
                    state: {
                        selected: true
                    }
                })
            }),
        reducer = function (filters, filter) {
            filters[filter.data.get('content')] = filter.isSelected();
            return filters;
        },
        // Теперь создадим список, содержащий 5 пунктов.
        listBoxControl = new ymaps.control.ListBox({
            data: {
                content: 'Фильтр',
                title: 'Фильтр'
            },
            items: listBoxItems,
            state: {
                // Признак, развернут ли список.
                expanded: true,
                filters: listBoxItems.reduce(reducer, {})
            }
        });
    myMap.controls.add(listBoxControl);

    // Добавим отслеживание изменения признака, выбран ли пункт списка.
    listBoxControl.events.add(['select', 'deselect'], function (e) {
        var listBoxItem = e.get('target');
        var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
        filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
        listBoxControl.state.set('filters', filters);
    });

    var filterMonitor = new ymaps.Monitor(listBoxControl.state);
    filterMonitor.add('filters', function (filters) {
        // Применим фильтр.
        objectManager.setFilter(getFilterFunction(filters));
    });

    function getFilterFunction(categories) {
        return function (obj) {
            var content = obj.properties.balloonContent;
            return categories[content]
        }
    }

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);


     objectManager.add({
            "type": "FeatureCollection",
            "features": [
                {
                    "id": 0,
                    "type": "Feature",
                    "properties": {
                        "balloonContentBody": "<img src='pic/0.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Барбершоп «Барбер Цех №1» в Минске по лучшим ценам: мужские стрижки, коррекция бороды, тонировка, депиляция. </div>",
                        "balloonContentHeader": "<div>Барбершоп “Барбер Цех №1”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.85497980255443,
                            27.479044561365836
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                },
                {
                    "properties": {
                        "balloonContentBody": "<div>Все самые яркие и смелые задумки можно воплотить в жизнь в этой тату-студии! Ребята уже более трёх лет работают в таких стилях как акварельная техника, графика и олд-нью скул. Предоставляемые услуги - художественные татуировки, флеши, исправление некачественных работ, разработка эскизов и перекрытие шрамов.</div>",
                        "balloonContentHeader": "<div>Тату-студия “Чёрная рука”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.85497980255443,
                            27.479044561365836
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 1,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/2.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Мужские и женские стрижки, окрашивание волос,уход за волосами, консультация и услуги косметолога, маникюр, педиикюр, брови, ресницы, макияж, прическа, депиляция, массаж… Тяжело перечислить весь спектр процедур этого салона. Соотношение цены и качества приятно порадует вас, а онлайн-запись сделает этот поход еще приятнее.“Очень красивое и душевное место!Доброжелательная и уютная атмосфера, сервис на высшем уровне! Мастера- профессионалы, милейшие администраторы! Успехов и процветания”</div>",
                        "balloonContentHeader": "<div>Салон красоты “Крем”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.86755626346887,
                            27.48562257952621
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 2,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/3.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Мастера “Сириуса” знают, как важна для посетителей внешность и красота, молодой сияющий вид, и стремятся сделать всё, для того что бы помочь это сохранить. Услуги парикмахерской, ногтевой сервис, уход за лицом и телом, инфракрасная сауна и многое другое.“Посещаю студию красоты уже не один год! И ничего кроме слов благодарности сказать не могу. Всегда уютная и комфортная обстановка! Первокласнейшие мастера, знающие свое дело”</div>",
                        "balloonContentHeader": "<div>Салон красоты “Сириус”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.86815865867324,
                            27.48295701627453
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 3,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/4.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>“Twins” - студия художественной татуировки, перманентного макияжа и пирсинга, основанная в 2017 году. Здесь вы можете воплотить свои самые смелые желания, или исправить/удалить/спасти прошлые татуировки.“Пять баллов безоговорочно. Сплоченный коллектив, приятная атмосфера, хорошая музыка на фоне, на ресепшене милая и улыбчивая девушка сидит, заряжает позитивом на день.”“Отличный тату салон! Общительные мастера, а самое главное, что все на высшем уровне. Всем рекомендую, в выборе не ошибётесь) Весь процесс проходит на позитивной ноте и загрустить вам не дадут.”</div>",
                        "balloonContentHeader": "<div>Тату-студия “Twins”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.85497980255443,
                            27.479044561365836
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 4,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/5.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>“Парикмахерская №1” - это коворкинг, который предлагает широкий спектр современных услуг: стрижки, современные и классические методы окраски, уход за волосами, маникюр, педикюр и многое другое. Всего в Беларуси работает 7 салонов и более 200 лучших мастеров.“Хорошая парикмахерская. Небольшая стоимость стрижки. Можно записаться на определенное время по телефону. Хорошие мастера, всегда чистенько и аккуратно.  Рядом с метро Петровщина. Очень часто большие очереди особенно после 17.00, но очередь движется быстро.”</div>",
                        "balloonContentHeader": "<div> Парикмахерская №1</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.8666128596022,
                            27.48442377189848
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 5,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<div>“Lash&People” предоставляют полный комплекс бьюти-услуг для вашей красоты, молодости и отличного настроения. Среди предоставляемых услуг брови, ресницы, перманент, стрижки, укладки, окраски, маникюр, педикюр и депиляция. “Классные мастера, не только качественно выполняют свою работу, но и посоветуют, индивидуальный подход. Отдельный плюс - демократичные цены”</div>",
                        "balloonContentHeader": "<div>Парикмахерская и студия наращивания ресниц “Lash&People”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.86657008646552,
                            27.472447215756624
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 6,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/7.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Фрау Марта - это салон красоты, который оказывает полный цикл услуг: косметология, уход за телом, ногтевой сервис и парикмахерские услуги. Перед процедурой вы можете записаться на бесплатную консультацию специалиста.</div>",
                        "balloonContentHeader": "<div>Центр красоты и эстетической медицины Фрау Марта</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                        "geometry": {
                            "coordinates": [
                                53.85913226670135,
                                27.471742425834194
                            ],
                            "type": "Point"
                        },
                        "options": {
                            "iconLayout": 'default#imageWithContent',
                            "iconImageHref": 'icons/красота.png',
                            "iconImageSize": [34, 34],
                            "iconImageOffset": [-16, -64],
                            "iconContentOffset": [-23, 43],
                        },
                        "id": 7,
                        "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/8.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>“White Studio” - это мужские и женские стрижки, аккуратный маникюр и педикюр, татуаж, брови, ресницы, а также широкий спектр косметологических услуг.</div>",
                        "balloonContentHeader": "<div>Салон красоты “White Studio”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.85426501607575,
                            27.485129459223057
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 8,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/9.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Косметологические услуги, перманент, маникюр/педикюр, наращивание волос и даже курсы обучения макияжу - это все про “Beauty House”. А онлайн-запись и частые акции сделают ваш поход в салон ещё приятнее!</div>",
                        "balloonContentHeader": "<div>Салон красоты “Beauty House”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.85548007092937,
                            27.478701108361918
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 9,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/10.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Основатели салона красоты «Миэль» создали уютную атмосферу и комфортные условия для преображения, отдыха и отличного времяпрепровождения. Большое внимание уделяется безопасности гостей. Проводится обязательная многоступенчатая стерилизация инструментов, применяются только проверенные косметические средства ведущих мировых брендов. В процессе работы мастера учитывают индивидуальные особенности каждого посетителя, благодаря чему результат порадует даже самого взыскательного гостя. Но главная изюминка салона — это разумные цены, доступные для широкого круга потребителей.</div>",
                        "balloonContentHeader": "<div>Салон красоты “Миэль”</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.852653221244715,
                            27.477918397860627
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 10,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/11.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Имидж-студия Евгении Пилеко – это уютное место, где вы сможете почувствовать свою индивидуальность и посетить мастеров парикмахерского искусства, маникюрного и педикюрного сервиса, а также бровиста и мастера по депиляции и массажу.</div>",
                        "balloonContentHeader": "<div>Имидж-студия Евгении Пилеко</div>",
                        "balloonContent": "Красота",
                        "clusterCaption": "Красота",
                        "hintContent": "Красота",
                        "iconCaption": "Красота"
                    },
                    "geometry": {
                        "coordinates": [
                            53.852621078472346,
                            27.47477995553136
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/красота.png',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 11,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<img src='pic/12.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Это главное здание администрации нашего района. Здесь решаются все важные дела, касающиеся внутреннего управления, а также различные обращения граждан. Обратиться сюда можно по телефону или написав на почту, которые есть на сайте https://mosk.minsk.gov.by</div>",
                        "balloonContentHeader": "<div>Администрация Московского района, </div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.894245,
                            27.529796
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 12,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<div>Общежитие БГМУ №10 располагается по адресу пр. Дзержинского 93. Здесь проживают студенты всех факультетов медицинского университета, так что будьте аккуратны: человек, с которым вы захотите поссориться, запросто может оказаться вашим будущим лечащим врачом. (Да и вообще не надо ссориться)</div>",
                        "balloonContentHeader": "<div>Общежитие БГМУ №10</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.858765,
                            27.483811
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 13,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<div>Общежитие №8 БГПУ находится по адресу ул. Чюрлёниса 3. В данном общежитии проживают студенты, мечтающие стать прекрасными преподавателями и учителями. Если вдруг вам когда-то ещё понадобится репетитор, здесь его найти будет проще всего.  В здании также функционирует паспортный стол.</div>",
                        "balloonContentHeader": "<div>Общежитие №8 БГПУ</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.857987,
                            27.482824
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 14,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<div>Белорусский Государственный Университет имеет в “Студенческой деревне” целых два общежития: №4 по адресу ул. Чюрлёниса 7 и № 11 по адресу пр. Дзержинского 87.  Здесь живут студенты абсолютно разных по программе факультетов, но при этом прекрасно находят общий язык. А в общежитии №11 даже работает студия развития “Soft skills”.</div>",
                        "balloonContentHeader": "<div>Общежитие №4 БГУ</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.856998,
                            27.485408
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 15,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<div>Белорусский Государственный Университет имеет в “Студенческой деревне” целых два общежития: №4 по адресу ул. Чюрлёниса 7 и № 11 по адресу пр. Дзержинского 87.  Здесь живут студенты абсолютно разных по программе факультетов, но при этом прекрасно находят общий язык. А в общежитии №11 даже работает студия развития “Soft skills”.</div>",
                        "balloonContentHeader": "<div>Общежитие №11 БГУ</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.859786,
                            27.483472
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 16,
                    "type": "Feature"
                },
                {
                    "properties": {
                        "balloonContentBody": "<div>Общежитие БГУИР №4 находится по адресу пр. Дзержинского 95. Ходят слухи, что люди здесь иногда общаются бинарным кодом, ведь здесь живут студенты, готовящиеся стать программистами самых разных направлений. Только не просите их починить вам принтер!</div>",
                        "balloonContentHeader": "<div>Общежитие БГУИР №4</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.858257,
                            27.485107
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 17,
                    "type": "Feature"
                },
                {
                    "properties": {
                    "balloonContentBody": "<div>Общежитие БГЭУ №9 находится по адресу ул. Чюрлёниса 1 и делит здание со студенческой поликлиникой. Студенты, живущие здесь, обучаются экономическому делу, так что, если вдруг, вы влезли в долги, покупая лабораторные работы, вы всегда можете обратиться сюда за помощью.</div>",
                    "balloonContentHeader": "<div>Общежитие БГЭУ №9</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.858378,
                            27.480997
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 18,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<div>Общежитие БНТУ №18 можно найти сразу за стадионом, по адресу пр. Дзержинского 83/16. Здесь проживают студенты различных технических специальностей: от тех кто придумывает деталь, до тех, кто её делает. Они умеют многое и, возможно, будут рады поделиться своими знаниями, если вам это будет нужно.</div>",
                    "balloonContentHeader": "<div>Общежитие БНТУ №18</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.859079,
                            27.488169
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 19,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/20.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>ЗАГС - это место, где корабли любви начинают… Ну вы и сами всё знаете. Данный ЗАГС является самым большим в Республике и содержит в себе целых 2 зала для бракосочетания. Узнать контактную информацию можно по ссылке: https://sigmapolus.com/project/zags/</div>",
                    "balloonContentHeader": "<div>ЗАГС</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.861233,
                            27.478584
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 20,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<div>Общежития МГЛУ №1 и МГЛУ №4 можно найти по адресам ул. Чюрлёниса 5 и пр. Дзержинского 97 соответственно. В них живут студенты, готовящиеся к работе с различными языками: китайским, немецким, английским и многими другими. Поэтому если вы не понимаете речь человека славянской внешности - он скорее всего отсюда.</div>",
                    "balloonContentHeader": "<div>Общежития МГЛУ №1</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.857504,
                            27.484182
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 21,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<div>Общежития МГЛУ №1 и МГЛУ №4 можно найти по адресам ул. Чюрлёниса 5 и пр. Дзержинского 97 соответственно. В них живут студенты, готовящиеся к работе с различными языками: китайским, немецким, английским и многими другими. Поэтому если вы не понимаете речь человека славянской внешности - он скорее всего отсюда.</div>",
                    "balloonContentHeader": "<div>Общежития МГЛУ №4</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.857757,
                            27.486318
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 22,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/23.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Центр располагается в общежитии №1 МГЛУ комплекса “Студенческая деревня” и занимаются организацией(или помощью энтузиастам с организацией) различных мероприятий в сфере волонтерства. Это способствует развитию не только отношений между участниками, но также и развитию всего общества. У них есть свой сайт, а также и соц.сети:</div>",
                    "balloonContentHeader": "<div>Республиканский Волонтёрский центр</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.856891,
                            27.484378
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 23,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/24.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Данный центр находится в общежитии №4 БГУ комплекса “Студенческая Деревня”. Эта организация занимается реализацией различных проектов, связанных с молодёжью: мероприятия, поддержка молодых талантов, поддержка инициатив и многое другое, что улучшит жизнь студента. А вот и их сайт: https://moladz.by/glavnaya</div>",
                    "balloonContentHeader": "<div>Республиканский молодёжный центр</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.857279,
                            27.485738
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 24,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/25.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Данный центр находится в “Студенческой деревне”, прямо в здании общежития №8 БГПУ. Любой студент может обратиться сюда в трудный момент и может быть уверен, что найдёт поддержку. Также центр занимается и обучающей деятельностью: проведение семинаров, написание различных пособий и даже программ обучения. Больше информации по ссылке: http://rcpp.by/o-centre/</div>",
                    "balloonContentHeader": "<div>Республиканский центр Психологической Помощи</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.857391,
                            27.483129
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 25,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/26.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Это место, в котором справедливость всегда берёт верх. А самое важное, что туда может обратиться абсолютно любой человек и он обязательно получит ответ. Обращаться сюда: https://mosk.minsk.gov.by/sluzhby-i-podrazdeleniya/sud</div>",
                    "balloonContentHeader": "<div>Суд Московского района</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.862728,
                            27.481632
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 26,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/27.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В этом месте, в случае надобности, вы можете: получить паспорт, обратиться с заявлением о нарушении закона, запросить установку охранной сигнализации, оформить своё пребывание на территории РБ, в случае, если вы иностранец, зарегистрировать своё место жительства и получить многие другие услуги, связанные с официальными документами и законом.Контакты: https://mosk.minsk.gov.by/sluzhby-i-podrazdeleniya/upravlenie-vnutrennikh-del</div>",
                    "balloonContentHeader": "<div>УВД Администрации Московского района</div>",
                        "balloonContent": "Администрация",
                        "clusterCaption": "Администрация",
                        "hintContent": "Администрация",
                        "iconCaption": "Администрация"
                    },
                    "geometry": {
                        "coordinates": [
                            53.888362,
                            27.528583
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/администрация.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 27,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/28.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Прекрасная кофейня с уютной атмосферой и нам очень повезло, ведь их целых две в шаговой доступности от общежитий. Здесь можно провести прекрасный вечер с друзьями, играя в настолки(здесь они есть) или же пригласить кого-нибудь на свидание)) Вот два адреса: пр. Дзержинского 115 и ул. Яна Чечота 7. А ещё небольшой секрет: у них есть свой приложение и там можно скидочку получить. Только тссс.</div>",
                    "balloonContentHeader": "<div>Varka coffee</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.855269,
                            27.478539
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 28,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/29.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Это место - кафе-кондитерская. Здесь вы можете попробовать нежнейшие десерты(как классические, так и авторские). Они завоевали сердца многих сладкоежек, а их инстаграмм выглядит просто божественно: https://www.instagram.com/cafe.moulin/ Вы кстати можете заказать десерт на заказ, или, выбрав что-то из меню, запросить доставку. Поверьте, кафе стоит посещения по адресу ул. Яна Чечота 7.</div>",
                    "balloonContentHeader": "<div>Мулен</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.849796,
                            27.477953
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 29,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/30.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Старый добрый McDonald's претерпел изменения названия, но не изменил своим рецептам. Всё те же вкуснейшие бургеры, знакомые многим, в сочетании с картошкой фри и знаменитая буква M на логотипе. Это всё находится по адресу пр. Дзержинского 96. Заведение находится недалеко от общежитий, так что будьте аккуратны с перееданием).</div>",
                    "balloonContentHeader": "<div>Mak.by</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.864993,
                            27.484241
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 30,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/31.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Никто так и не может сказать: популярная эта пиццерия или нет, но все определённо сошлись во мнении, что пицца здесь шикарная. Тончайшее тесто и блюда, сделанные как дома. Что может быть лучше? Всю эту сказку можно попробовать на заказ</div>",
                    "balloonContentHeader": "<div>Пицца-лисица</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.867942,
                            27.484368
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 31,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<div>Данное кафе подойдет всем, кто хочет попробовать что-то нетрадиционно белорусское. Самса, хачапури, плов и другая схожая кухня здесь готовится как в своих родных странах. Цены здесь кстати, такие же вкусные, как и еда. Обязательно заходите сюда по адресу пр. Дзержинского 104. А вот кстати и их сайт: https://samsa.by</div>",
                    "balloonContentHeader": "<div>Самса</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.862406,
                            27.480507
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 32,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/33.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Если вы соскучились по домашней бабушкиной кухне, а времени приготовить её нет, то вы всегда можете посетить это прекрасное кафе. В Тимохином закутке готовят прекрасную белорусскую кухню по доступным ценам(даже для студентов). У них вот и своя инста есть: https://www.instagram.com/t.z_malinayka/</div>",
                    "balloonContentHeader": "<div>Тимохин Закуток</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.849875,
                            27.472155
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 33,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/34.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Прямо вблизи студенческой деревни расположилась прекрасная хинкальня по адресу пр. Дзержинского 104. Хинкальня — это семья, здесь берегут рецепты любимых блюд и готовят только самое вкусное: хинкали с ароматным бульоном и сочной начинкой, лодочки хачапури, согревающий харчо и нежную чихиртму. А еще самый домашний Наполеон! Обязательно сходите хотя бы в одну, и вас оттуда уже будет не вытащить. А вот кстати и их сайт: https://hinkalnia.by </div>",
                    "balloonContentHeader": "<div>Хинкальня</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.861575,
                            27.480304
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 34,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/35.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Сеть кофеен cofix ориентирована на студентов, так что мы не могли не упомянуть её в нашем списке. Вот вам сразу два адреса: ул. Уманская 54, пр. Дзержинского 91. Здесь вы всегда получите недорогой кофе или сезонный напиток, а бариста вас поймут с полуслова, ведь зачастую это такие же студенты. У них кстати есть своё приложение с халявой) Ну и ещё: https://cofix.global/ru-by/main/minsk/ Сами разберетесь)</div>",
                    "balloonContentHeader": "<div>Cofix</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.87515,
                            27.498516
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 35,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/36.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Сеть кофеен cofix ориентирована на студентов, так что мы не могли не упомянуть её в нашем списке. Вот вам сразу два адреса: ул. Уманская 54, пр. Дзержинского 91. Здесь вы всегда получите недорогой кофе или сезонный напиток, а бариста вас поймут с полуслова, ведь зачастую это такие же студенты. У них кстати есть своё приложение с халявой) Ну и ещё: https://cofix.global/ru-by/main/minsk/ Сами разберетесь)</div>",
                    "balloonContentHeader": "<div>Cofix</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.859557,
                            27.481926
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 36,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/37.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Спор где пицца лучше может длиться вечно, но что-то остаётся вечным - пицца Domino’s. Еду из этого заведения пробовали все. Ещё раз отведать любимую пиццу с сырным бортиком можно по адресу пр. Дзержинского 106. Надеемся встретим вас там только за едой, а не за работой)).</div>",
                    "balloonContentHeader": "<div>Domino's</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.858671,
                            27.477374
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 37,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/38.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Всем знакомый фастфуд с острыми крылышками от Полковника Сандерса. Конечно же речь о сети ресторанов быстрого питания KFC. В Московском районе KFC имеет целых 5 заведений: пр. Дзержинского 94, пр. Дзержинского 91, ул. Каролинская 5, пр. Любимова 17 и пр. Газеты Звезда 16/1. Думаем, их не нужно рекомендовать, вы и так туда сходите. Не переборщите с остротой!)</div>",
                    "balloonContentHeader": "<div>KFC</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.865267,
                            27.484976
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 38,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/39.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Всем знакомый фастфуд с острыми крылышками от Полковника Сандерса. Конечно же речь о сети ресторанов быстрого питания KFC. В Московском районе KFC имеет целых 5 заведений: пр. Дзержинского 94, пр. Дзержинского 91, ул. Каролинская 5, пр. Любимова 17 и пр. Газеты Звезда 16/1. Думаем, их не нужно рекомендовать, вы и так туда сходите. Не переборщите с остротой!)</div>",
                    "balloonContentHeader": "<div>KFC</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.859005,
                            27.482342
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 39,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/40.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Всем знакомый фастфуд с острыми крылышками от Полковника Сандерса. Конечно же речь о сети ресторанов быстрого питания KFC. В Московском районе KFC имеет целых 5 заведений: пр. Дзержинского 94, пр. Дзержинского 91, ул. Каролинская 5, пр. Любимова 17 и пр. Газеты Звезда 16/1. Думаем, их не нужно рекомендовать, вы и так туда сходите. Не переборщите с остротой!)</div>",
                    "balloonContentHeader": "<div>KFC</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.850311,
                            27.484699
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 40,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/41.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Всем знакомый фастфуд с острыми крылышками от Полковника Сандерса. Конечно же речь о сети ресторанов быстрого питания KFC. В Московском районе KFC имеет целых 5 заведений: пр. Дзержинского 94, пр. Дзержинского 91, ул. Каролинская 5, пр. Любимова 17 и пр. Газеты Звезда 16/1. Думаем, их не нужно рекомендовать, вы и так туда сходите. Не переборщите с остротой!)</div>",
                    "balloonContentHeader": "<div>KFC</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.859477,
                            27.462426
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 41,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<div>Всем знакомый фастфуд с острыми крылышками от Полковника Сандерса. Конечно же речь о сети ресторанов быстрого питания KFC. В Московском районе KFC имеет целых 5 заведений: пр. Дзержинского 94, пр. Дзержинского 91, ул. Каролинская 5, пр. Любимова 17 и пр. Газеты Звезда 16/1. Думаем, их не нужно рекомендовать, вы и так туда сходите. Не переборщите с остротой!)</div>",
                    "balloonContentHeader": "<div>KFC</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.864946,
                            27.467462
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 42,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<div>Кафе Namaste, спряталось от всех в домах жилого района по адресу пр. дзержинского 83/13. Но им и не нужно себя показывать: главная их фишка - доставка. Тут есть еда на любой вкус: фастфуд, пицца, шаурма, азиатская и ближневосточная кухня. Всё это по очень привлекательным ценам кстати. Вот их сайт: https://cafenamaste.by Заказывайте еду - не пожалеете.</div>",
                    "balloonContentHeader": "<div>Namaste</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.858775,
                            27.490281
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 43,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/44.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Если вы ещё ни разу не слышали о PON-PUSHKA, то мы вам завидуем. Это вкуснейшие пончики по студенческим ценам. Что ещё надо для счастья?</div>",
                    "balloonContentHeader": "<div>PON-PUSHKA</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.84681,
                            27.476572
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 44,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/45.webp' style='margin-left: 60px; width: 300px; height: 300px;'/><div>ToKINY - Нью-Йоркский стиль и Японское качество. Именно такой слоган у ресторана суши, находящегося по адресу пр. Дзержинского 126. В этом ресторане вы получаете суши в термоупаковках и можете донести их куда угодно тёплыми, а также всё это натурально - не используется ни один усилитель вкуса. Также вы можете побаловать себя ещё и авторскими рецептами азиатской кухни. Заведение однозначно достойно посещения.</div>",
                    "balloonContentHeader": "<div>ToKINY</div>",
                        "balloonContent": "Еда",
                        "clusterCaption": "Еда",
                        "hintContent": "Еда",
                        "iconCaption": "Еда"
                    },
                    "geometry": {
                        "coordinates": [
                            53.847445,
                            27.47161
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/еда.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 45,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/46.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Гипермаркет находится на территории студенческой деревни, что очень удобно, т.к. в нем находится множество магазинов, в которых можно найти все самое необходимое для жизни: магазины одежды (Марк Формель, Sisters и т.д.), продуктовый магазин Алми, Кафе Гараж, KFC, батутная арена «heropark», магазин косметики/бытовой химии «Мила» и многое другое</div>",
                    "balloonContentHeader": "<div>Гипермаркет «Алми»</div>",
                        "balloonContent": "Магазины",
                        "clusterCaption": "Магазины",
                        "hintContent": "Магазины",
                        "iconCaption": "Магазины"
                    },
                    "geometry": {
                        "coordinates": [
                            53.867057,
                            27.48751
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/магазины.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 46,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/47.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Гипермаркет ProStore в Малиновке, как и все магазины этой популярной сети, позволяет совмещать приятное с полезным. В будни посещение ProStore – это возможность быстро купить все необходимые для дома товары. В выходные – способ хорошо провести время с семьей или друзьями.</div>",
                    "balloonContentHeader": "<div>Гипермаркет «Простор»</div>",
                        "balloonContent": "Магазины",
                        "clusterCaption": "Магазины",
                        "hintContent": "Магазины",
                        "iconCaption": "Магазины"
                    },
                    "geometry": {
                        "coordinates": [
                            53.84802,
                            27.471729
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/магазины.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 47,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/48.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Находится в пешей доступности от станции метро Михалово. Огромный выбор велосипедов и запчастей.</div>",
                    "balloonContentHeader": "<div>ТЦ «Велосити»</div>",
                        "balloonContent": "Магазины",
                        "clusterCaption": "Магазины",
                        "hintContent": "Магазины",
                        "iconCaption": "Магазины"
                    },
                    "geometry": {
                        "coordinates": [
                            53.874307,
                            27.499576
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/магазины.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 48,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/49.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Торговый центр GLOBO является одним из крупнейших в Минске. Более 200 магазинов, таких как Буслик, Электросила, Рублёвский и многие другие ждут вас!</div>",
                    "balloonContentHeader": "<div>ТЦ «Globo»</div>",
                        "balloonContent": "Магазины",
                        "clusterCaption": "Магазины",
                        "hintContent": "Магазины",
                        "iconCaption": "Магазины"
                    },
                    "geometry": {
                        "coordinates": [
                            53.875541,
                            27.49811
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/магазины.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 49,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/50.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Ассортимент средненький, цены средние. В кафетерии недорогая и вкусная пицца собственного производства, мороженое в рожке разных вкусов очень дёшево, есть кулинар</div>",
                    "balloonContentHeader": "<div>ТЦ «Живинка»</div>",
                        "balloonContent": "Магазины",
                        "clusterCaption": "Магазины",
                        "hintContent": "Магазины",
                        "iconCaption": "Магазины"
                    },
                    "geometry": {
                        "coordinates": [
                            53.848077,
                            27.501827
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/магазины.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 50,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<div>Многофункциональный общественный комплекс ТЦ МAGNIT расположен на одной из самых оживленных магистралей города – проспекте Дзержинского 106. Рядом находятся станции метро Петровщина и Малиновка, пролегает большое количество автобусных и троллейбусных маршрутов.</div>",
                    "balloonContentHeader": "<div>ТЦ «Магнит»</div>",
                        "balloonContent": "Магазины",
                        "clusterCaption": "Магазины",
                        "hintContent": "Магазины",
                        "iconCaption": "Магазины"
                    },
                    "geometry": {
                        "coordinates": [
                            53.858308,
                            27.476581
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/магазины.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 51,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/52.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Торгово-развлекательный центр «Титан» – одно из крупнейших мест для шопинга и развлечений в Минске. Галереи магазинов открыты в стилобате «южных ворот Минска» – так архитекторы называют комплекс «Титан» за его гигантские размеры и узнаваемый силуэт. Расположен он рядом со станцией метро «Петровщина» и занимает внушительные 93 тыс. кв.м.</div>",
                    "balloonContentHeader": "<div>ТЦ «Титан»</div>",
                        "balloonContent": "Магазины",
                        "clusterCaption": "Магазины",
                        "hintContent": "Магазины",
                        "iconCaption": "Магазины"
                    },
                    "geometry": {
                        "coordinates": [
                            53.861058,
                            27.479425
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/магазины.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 52,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/53.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Данный театр был создан в 1970 году и первым спектаклем для него стал “Поёт жаворонок” белорусского композитора Юрия Семеняко. До 2000 года театр назывался по-другому: “Государственный театр музыкальной комедии Беларуси”, поэтому возможно от ваших родителей вы могли слышать старое название. За всё время существования театр поставил более 100 спектаклей, захватившие сердца и взрослых, и детей. В год здание встречает свыше 250тыс. посетителей и вам точно стоит побывать среди этих людей!</div>",
                    "balloonContentHeader": "<div>Белорусский государственный академический театр</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.896162,
                            27.539634
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 53,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/54.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Само здание появилось в Минске ещё в 1906 году, но изначально это была синагога. В 20-х годах здесь оборудовали рабочий клуб, а в 1930-м году основали сцену, с которой выступали Маяковский, Утёсов и другие известные личности. Только после Второй Мировой Войны здание отреставрировали и здесь появился театр им. Горького. Правда сразу он назывался просто драматическим театром и только в 1955 году получил название имени Горького. Окончательно имя сформировалось в 1994 после присвоения звания академического театра. Сегодня же театр является одним из ведущих в стране, что делает его обязательным к посещению</div>",
                    "balloonContentHeader": "<div>Государственный академический драматический театр им. Горького</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.898371,
                            27.551023
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 54,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/55.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Этот парк располагается на месте военного еврейского гетто. В это гетто свозили не только евреев из Беларуси, но также и из Германии. Поэтому на территории парка можно найти плиты с названиями нескольких немецких городов. Надписи на плитах выполнены на трёх языках: русском, немецком и иврите. Это подчёркивает, что трагедия задела все народы, вне зависимости от того, как они разговаривают.</div>",
                    "balloonContentHeader": "<div>Еврейский мемориальный парк</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.90167,
                            27.53676
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 55,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<div>Данный памятник установлен в 2000 году на площади Независимости, недалеко от “Красного костёла”. Колокол является “двойником” колокола “Ангел”, уцелевшего после атомной бомбардировки японского города Нагасаки 9 августа 1945 года. В основании памятника заложены капсулы с землёй из Иерусалима, Хиросимы, Нагасаки, Фукусимы и Чернобыля. Памятник напоминает нам о том, как опасны и губительны могут быть ядерные силы.</div>",
                    "balloonContentHeader": "<div>КОЛОКОЛ НАГАСАКИ</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.8960778,
                            27.5469778
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 56,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/57.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Этот костёл также называют “Красным костёлом” и он является самым известным католическим храмом столицы. Строительство здания началось в 1905 году и уже в 1910 храм был освящён. Своё название костёл получил из-за материала строительства: только красный кирпич. В 1932 году костёл был закрыт, а здание использовалось в качестве театра БССР, а позже переоборудован в киностудию. Во время войны здание снова стало костёлом на время оккупации, а с окончание войны окончательно закрылось.И только в 1990 году костёл возобновил свою работу.</div>",
                    "balloonContentHeader": "<div>Костёл Святого Симеона и Святой Елены</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.89637,
                            27.547636
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 57,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/58.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Данный мемориал находится напротив кладбища бывшей деревни Петровщина. Во время войны жители деревни не могли позволить себе достойно похоронить солдат, поэтому делали это в различных местах. По окончании войны тела эксгумировали и перезахоронили напротив кладбища, воздвигнув мемориал. Здесь упокоены 35 человек, из которых 24 остались безымянными.</div>",
                    "balloonContentHeader": "<div>Мемориал “Память”</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.868086,
                            27.489456
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 58,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/59.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Музей истории белорусского кино один из самых молодых музеев Беларуси, хотя всё так же остаётся крайне интересным. Основан он по инициативе белорусских кинематографов в 1966 году при киностудии “Беларусьфильм” для сохранения различных материалов. Постепенно это всё перерастало в общественное дело и в 2002 году музей был открыт для всеобщего посещения.</div>",
                    "balloonContentHeader": "<div>Музей истории белорусского кино</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.897266,
                            27.548617
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 59,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/60.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Экспозиция музея будет интересна как врачам, так и людям, далеким от медицины. Во время экскурсии вы узнаете множество любопытных фактов о развитии лечебного дела в нашей стране и об истории Беларуси в целом. Среди прочего, в музее вы сможете увидеть фотографии конца XIX – начала XX вв., картину неизвестного немецкого автора XIX в. «Аллегория медицины», археологические находки и многое другое.</div>",
                    "balloonContentHeader": "<div>Музей истории медицины Беларуси</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.886982,
                            27.534873
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 60,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/61.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Создание прихода данного храма пришлось на 1996 год. Спустя 2 года началось строительство. Первая служба в храме прошла в 2005 году, на цокольном этаже, хотя строительство ещё было не окончено. По завершении строительства Верхний храм был освящён в честь Софии Слуцкой, а нижний - в честь иконы Пресвятой Богородицы</div>",
                    "balloonContentHeader": "<div>Храм Праведной Софии Слуцкой</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.84519,
                            27.50471
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 61,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/62.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Данный храм располагается на окраине Минска и является шедевром деревянного зодчества. В 1998 году была создана община, с поручением о строительстве храма, что было значимым событием, т.к. ранее деревянные храмы были только в областях, но никак не в крупных городах. Освящена церковь была в 2003 году, что делает храм достаточно молодым, но всё ещё крайне популярным и важным для православной общины.</div>",
                    "balloonContentHeader": "<div>Церковь в честь преподобных Старцев Оптинских</div>",
                        "balloonContent": "Просвещение",
                        "clusterCaption": "Просвещение",
                        "hintContent": "Просвещение",
                        "iconCaption": "Просвещение"
                    },
                    "geometry": {
                        "coordinates": [
                            53.852103,
                            27.458101
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/просвещение.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 62,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/63.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Хочешь научиться водить? Тогда тебе точно сюда! Подробная информация тут: https://avtoorient.by/?utm_source=yandex&utm_medium=cpc&utm_campaign=Petrovschina&utm_content=12998863190&utm_term=%D0%90%D0%B2%D1%82%D0%BE%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%BF%D0%BB%D1%8E%D1%81&_openstat=ZGlyZWN0LnlhbmRleC5ydTs0ODY3MTkwNTsxMjk5ODg2MzE5MDt5YW5kZXguYnk6cHJlbWl1bQ&yclid=16372065958600376319</div>",
                    "balloonContentHeader": "<div>Автошкола «АвтоОриентПлюс»</div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.860396,
                            27.472386
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 63,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/64.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Автошкола «Все Категории»</div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.860886,
                            27.465221
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 64,
                    "type": "Feature"
                },
                              
                {"properties": {
                    "balloonContentBody": "<img src='pic/66.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Автошкола “Рос ДОСААФ Московского района”</div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.85802,
                            27.500164
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 66,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/67.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Студия иностранных языков English City</div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.869715,
                            27.486423
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 67,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/68.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Печатный центр “Антиква”</div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.851331,
                            27.476916
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 68,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/69.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Курсы по программированию Моя-Айти-Школа</div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.896866,
                            27.528057
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 69,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/70.png' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Курсы от опытных айтишников, практика на реальных проектах https://adukar.com/by/</div>",
                    "balloonContentHeader": "<div>Курсы по программированию Адукар</div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.887629,
                            27.538834
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 70,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/71.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Аптека Белфармация</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.859778,
                            27.482082
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 71,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "",
                    "balloonContentHeader": "<div>Моя аптека</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.860363,
                            27.478503
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 72,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "",
                    "balloonContentHeader": "<div>Государственная аптека</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.864216,
                            27.48489
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 73,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/74.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Зеленая аптека</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.858225,
                            27.476863
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 74,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/75.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Стоматология “Dental Clinic”</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.856259,
                            27.479651
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 75,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/76.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>13-я городская стоматологическая поликлиника</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.860195,
                            27.475846
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 76,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/77.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Стоматология “Элинтаплюс”</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.862173,
                            27.477289
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 77,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "",
                    "balloonContentHeader": "<div>Стоматология “Элинтаплюс”</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.858534,
                            27.481166
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 78,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/79.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>33 городская студенческая поликлиника, отделение общей врачебной практики Студенческая деревня</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.857864,
                            27.494643
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 79,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/80.png' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Медцентр Имред</div>",
                        "balloonContent": "Здоровье",
                        "clusterCaption": "Здоровье",
                        "hintContent": "Здоровье",
                        "iconCaption": "Здоровье"
                    },
                    "geometry": {
                        "coordinates": [
                            53.877594,
                            27.545268
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/здоровье.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 80,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/83.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Клуб виртуальной реальности U-ViW</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.874650, 27.499285
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 81,
                    "type": "Feature"
                },

                
                {"properties": {
                    "balloonContentBody": "<img src='pic/83.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>GamespotW</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.877340, 27.495847
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 82,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/84.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Gamespot</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.877340, 27.495847
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 82,
                    "type": "Feature"
                },


                {"properties": {
                    "balloonContentBody": "<img src='pic/86.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Кибер-клуб Pudge</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.897732, 27.547063
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 83,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/87.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Клуб виртуальной реальности Neurobox</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.860493, 27.478987
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 84,
                    "type": "Feature"
                },

                
                {"properties": {
                    "balloonContentBody": "<img src='pic/88.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Клуб виртуальной реальности Vr Zone</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.860492, 27.479000
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 85,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/89.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Брмц</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.905375, 27.534745
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 86,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/90.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Cyberspace</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.906041, 27.527846
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 87,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/91.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> АртКинотеатр</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.860872, 27.479406
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 88,
                    "type": "Feature"
                },
                


                {"properties": {
                    "balloonContentBody": "<img src='pic/92.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Берестье</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.864221, 27.483305
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 89,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/93.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Центральный</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.897635, 27.552570
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 91,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/94.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Боулинг-клуб Титан</div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.861058, 27.479425
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 92,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/95.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Бильярдный клуб Билли Джойс /div>",
                        "balloonContent": "Отдых",
                        "clusterCaption": "Отдых",
                        "hintContent": "Отдых",
                        "iconCaption": "Отдых"
                    },
                    "geometry": {
                        "coordinates": [
                            53.877490, 27.496265
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/отдых.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 93,
                    "type": "Feature"
                },
                {"properties": {
                    "balloonContentBody": "<img src='pic/96.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div> Skilltech.by /div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.846130, 27.478315
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 94,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/97.jpg' style='margin-left: 60px; width: 300px; height: 300px;'",
                    "balloonContentHeader": "<div>МУК учебный центр /div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.861740, 27.480183
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образзование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 95,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/98.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>адрес: просп. Дзержинского, 69/2 контакты: +375 44 707-66-80 www.itlandia.by</div>",
                    "balloonContentHeader": "<div>Айтиландия/div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.864654, 27.488311
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 96,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/99.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Datafield</div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.874345, 27.503008
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 96,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/100.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Teach IT /div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.899681, 27.543959
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 97,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/101.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Xb Software/div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.900131, 27.543583
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 99,
                    "type": "Feature"
                },

                
                {"properties": {
                    "balloonContentBody": "<img src='pic/102.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/>",
                    "balloonContentHeader": "<div>Clevertec/div>",
                        "balloonContent": "Образование",
                        "clusterCaption": "Образование",
                        "hintContent": "Образование",
                        "iconCaption": "Образование"
                    },
                    "geometry": {
                        "coordinates": [
                            53.900131, 27.543583
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/образование.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 100,
                    "type": "Feature"
                },


                {"properties": {
                    "balloonContentBody": "<img src='pic/103.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Санаторий Белорусочка</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            53.967019, 27.433049
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 101,
                    "type": "Feature"
                },
                
                {"properties": {
                    "balloonContentBody": "<img src='pic/104.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Санаторий Криницы</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            53.955204, 27.425335
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 102,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/нарочь.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Нарочь</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            54.906456, 26.703922
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 104,
                    "type": "Feature"
                },

                
                {"properties": {
                    "balloonContentBody": "<img src='pic/нарочанка.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Нарочанка</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            54.911512, 26.722104
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 105,
                    "type": "Feature"
                },

                  
                {"properties": {
                    "balloonContentBody": "<img src='pic/106.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Лесные озера</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            55.107161, 28.603783
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 106,
                    "type": "Feature"
                },

                     
                {"properties": {
                    "balloonContentBody": "<img src='pic/107.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Санаторий Летцы</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            55.198749, 29.927213
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 107,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/108.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Неман-72</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            53.729073, 23.789068
                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 108,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/108.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Свислочь</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            53.441305, 28.950456

                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 109,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/109.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Санаторий имени В.И. Ленина</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            53.153033, 29.247934

                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 110,
                    "type": "Feature"
                },


                 {"properties": {
                    "balloonContentBody": "<img src='pic/110.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Санаторий расположен на живописном берегу реки Днепр в окружении смешанных лесов и заливных лугов. Вблизи крупных населенных пунктов и транспортных узлов: в 12 км от города Рогачева, в 121 — от Гомеля, в 25 — от железнодорожной станции Жлобин. Поблизости отсутствуют промышленные предприятия, благодаря этому на территории санатория сохраняется девственная чистота лесов и лечебная свежесть воздуха. Все вместе — целебная сила природы и профессионализм оказываемых лечебных, косметических и диагностических услуг — гарантируют отдыхающим незабываемый отдых и качественное оздоровление!<br>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Санаторий Приднепровский</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            53.083364, 30.196875

                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 111,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/111.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Санаторий Буг - одна из крупнейших круглогодичных здравниц Беларуси, расположена в урочище Сосновый сбор на живописном берегу реки Мухавец в экологически чистом районе. Профиль санатория: болезни системы кровообращения, органов дыхания, костно-мышечной и соединительной ткани.<br> На сегодняшний день санаторий располагает хорошо оснащенной лечебно-диагностической базой, уютным номерным фондом, организованным досугом, условиями для активного отдыха. Санаторий Буг рассчитан на 500 мест. К вашим услугам благоустроенные корпуса: одноместные и двухместные номера со всеми удобствами двухместные двухкомнатные номера.<br>Используя естественную красоту и силу природы, мы создали для Вас уникальную базу для укрепления здоровья и полноценного отдыха. Надеемся, что побывав в нашем санатории, Вам не раз захочется к нам вернуться. И мы не раз скажем Вам - добро пожаловать в Санаторий Буг!<br>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Санаторий Буг</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            52.189065, 24.130506

                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 112,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/112.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Соединяя воедино природные факторы, сбалансированное питание и правильный подбор медицинских процедур, можно именно так создать для себя полезный и идеальный отдых. А идеальное место для этого — безусловно, санаторий «Чёнки». Санаторий Чёнки - это современный оздоровительный комплекс, предлагающий своим отдыхающим широкий спектр лечебно-профилактических процедур.<br> На территории санатория ЧЁНКИ воздух исключительно чистый, настоян на аромате лесных трав и хвои леса.<br> Отдыхающие размещаются в современных и уютных 2-местных однокомнатных номерах в корпусе №1, №2, №3 и более комфортных 2-местных однокомнатных улучшенных и 2-местных 2-комнатных номерах корпуса №1.<br> Одно из важнейших преимуществ нашего санатория это месторасположение. Мы находимся всего в 3 км. от черты г.Гомеля (областного центра Республики Беларусь) в поселке Чёнки. Территория компактная с преобладанием хвойного леса, рядом река Сож.<br> В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Санаторий Ченки</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            52.347437, 30.972591

                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 113,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/113.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>В санатории действует скидка 25% на путевки для всех членов профсоюза при предоставлении справки. Также по возвращению из санатория - возмещение путевки в размере 3х базовых величин</div>",
                    "balloonContentHeader": "<div>Санаторий-профилакторий БНТУ</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            53.991680, 27.463695

                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 114,
                    "type": "Feature"
                },

                {"properties": {
                    "balloonContentBody": "<img src='pic/114.jpg' style='margin-left: 60px; width: 300px; height: 300px;'/><div>Оказание материальной помощи    Назначение социальной стипендии   Заселение в арендных общежитияПомощь при заселении в общежития БГУИР Оформление льготного питания   Оздоровление студентов в санаториях Помощь при поиске съемного жилья Организация экскурсионных поездок  Помощь молодым семьямн</div>",
                    "balloonContentHeader": "<div>Профсоюз студентов</div>",
                        "balloonContent": "Профком",
                        "clusterCaption": "Профком",
                        "hintContent": "Профком",
                        "iconCaption": "Профком"
                    },
                    "geometry": {
                        "coordinates": [
                            53.918599, 27.593955

                        ],
                        "type": "Point"
                    },
                    "options": {
                        "iconLayout": 'default#imageWithContent',
                        "iconImageHref": 'icons/профком.svg',
                        "iconImageSize": [34, 34],
                        "iconImageOffset": [-16, -64],
                        "iconContentOffset": [-23, 43],
                    },
                    "id": 115,
                    "type": "Feature"
                },
                
            ],
        });
}
