//Функции
Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

//Переменные
var isUserLoggedIn = false;
if (document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[1].hasClass('tab_user') == true) {
	isUserLoggedIn = true;
}

if (isUserLoggedIn == true) {
	var userName = document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[1].getAttribute("title");
	var userLink = 'http://habrahabr.ru/users/' + userName + '/';
	var settingsLink = 'https://habrahabr.ru/auth/settings/';
	var logoutLink = 'http://habrahabr.ru/logout/' + userName + '/361393742/';
	var trackerLink = 'http://habrahabr.ru/tracker/';
	var dialogsLink = 'http://habrahabr.ru/conversations/';
	var favLink = 'http://habrahabr.ru/users/' + userName + '/favorites/';
	var votes = document.getElementById('user_tab').getElementsByClassName('text')[0].innerHTML;
}


//TODO: Хабранавигатор
//var d = document.getElementsByClassName('daily_best_posts')[0].outerHTML;
//var c = '<div class="block fast_navigator"><div class="title">Хабранавигатор</div><form action="http://habrahabr.ru/" method="post" id="fast_navagator"><select name="category" class="category_select"><option value="null" selected="">Категория</option><option value="administration">Администрирование</option><option value="databases">Базы данных</option><option value="security">Безопасность</option><option value="browsers">Браузеры</option><option value="web-services">Веб-сервисы</option><option value="layout">Верстка</option><option value="design-and-ui">Дизайн и юзабилити </option><option value="hardware-and-gadgets">Железо и гаджеты </option><option value="advertisment">Маркетинг и реклама</option><option value="media">Медиа</option><option value="management">Менеджмент</option><option value="education">Образование</option><option value="operation-systems">Операционные системы </option><option value="programming">Программирование</option><option value="startups-and-companies">Стартапы и компании</option><option value="telecommunications">Телекоммуникации </option><option value="cms">Фреймворки и CMS</option><option value="program-langs">Языки программирования</option><option value="dessert">Десерт</option><option value="different">Разное </option></select><p></p><select name="blog" disabled="" class="blog_select"><option value="null">Хаб</option></select><div class="buttons"><input type="submit" disabled="disabled" value="Посмотреть"> </div></form></div>'; 
//document.getElementsByClassName('daily_best_posts')[0].outerHTML = c + d;


//Перестраиваем шапку на основе данных из левого меню
var feedActive = "";
var postsActive = "";
var sandyActive = "";
var hubsActive = "";
var compsActive = "";

if (window.location.href.indexOf("feed") >= 0) {
	feedActive = "active";
} else if (window.location.href.indexOf("posts") >= 0) {
	postsActive = "active";
} else if (window.location.href.indexOf("sandbox") >= 0) {
	sandyActive = "active";
} else if (window.location.href.indexOf("hubs") >= 0) {
	hubsActive = "active";
} else if (window.location.href.indexOf("companies") >= 0) {
	compsActive = "active";
}

var oldSchoolMainMenu = '<div class="main_menu"><a href="http://habrahabr.ru/feed/all/" class="'+ feedActive + '">лента</a><a href="http://habrahabr.ru/posts/top/" class="'+ postsActive + '">посты</a><a href="http://toster.ru/">q&amp;a</a><a href="http://habrahabr.ru/sandbox/" class="'+ sandyActive + '">песочница</a><a href="http://habrahabr.ru/hubs/" class="'+ hubsActive + '">хабы</a><a href="http://habrahabr.ru/companies/" class="'+ compsActive + '">компании</a></div>';

if (isUserLoggedIn == false) {
	var oldSchoolHeader = '<div id="header"><div class="userpanel silver"><a href="http://habrahabr.ru/login/" class="login">войти</a> <a href="http://habrahabr.ru/register/">зарегистрироваться</a></div><a class="logo" href="http://habrahabr.ru/" title="На главную страницу"></a><div class="search"><form id="search_form" name="search" method="get" action="http://habrahabr.ru/search/"><input type="submit" value=""><input type="text" name="q" x-webkit-speech="" speech=""></form></div>' + oldSchoolMainMenu + '</div>';
} else {
	var oldSchoolHeader = '<div id="header"><div class="userpanel silver"><a href="' + userLink + '" class="username">' + userName + '</a> <a href="' + settingsLink + '" class="nav-settings">настройки</a> <a href="' + logoutLink + '">выход</a><br><a href="'+ trackerLink +'" class="trackerLink">трекер</a> <a href="'+dialogsLink +'" class="dialogsLink">диалоги</a> <a href="'+ favLink +'" class="favLink">избранное</a><br>'+ votes + '</div><a class="logo" href="http://habrahabr.ru/" title="На главную страницу"></a><div class="search"><form id="search_form" name="search" method="get" action="http://habrahabr.ru/search/"><input type="submit" value=""><input type="text" name="q" x-webkit-speech="" speech=""></form></div>' + oldSchoolMainMenu + '</div>';
}

var inner = document.getElementsByClassName('inner')[0].innerHTML;
document.getElementsByClassName('inner')[0].innerHTML = oldSchoolHeader + inner;

//Удаляем новый стиль
var styles = document.getElementsByTagName('link');
    for (index = 0; index < styles.length; ++index) {
    styles[index].parentNode.removeChild(styles[index]);
}
//FIXME: По какой-то непонятной причине приходится удалять стили дважды, с первого раза не получается.
var styles = document.getElementsByTagName('link');
    for (index = 0; index < styles.length; ++index) {
    styles[index].parentNode.removeChild(styles[index]);
}

//Добавляем измененный старый стиль, удаляем меню слева, логотипы под футером и название страницы
var headHTML = document.getElementsByTagName('head')[0].innerHTML;
headHTML += '<link type="text/css" rel="stylesheet" href="http://blackbloodm.org/oldhabr/data/all.css">';
headHTML += '<link type="text/css" rel="stylesheet" href="http://blackbloodm.org/oldhabr/data/forms.css">';
headHTML += '<link type="text/css" rel="stylesheet" href="http://blackbloodm.org/oldhabr/data/highlight.css">';
headHTML += '<link type="text/css" rel="stylesheet" href="http://blackbloodm.org/oldhabr/data/hubs-all.css">';
headHTML += '<link type="text/css" rel="stylesheet" href="http://blackbloodm.org/oldhabr/data/posts.css">';
headHTML += '<link type="text/css" rel="stylesheet" href="http://blackbloodm.org/oldhabr/data/companies.css">';
document.getElementsByTagName('head')[0].innerHTML = headHTML;

document.getElementById('layout').removeChild(document.getElementById('navbar'));
document.getElementById('layout').removeChild(document.getElementById('navbar_overlay'));

if (document.getElementsByClassName('page_head')[0]) {document.getElementsByClassName('page_head')[0].parentNode.removeChild(document.getElementsByClassName('page_head')[0]); }
document.getElementsByClassName('footer_logos')[0].parentNode.removeChild(document.getElementsByClassName('footer_logos')[0]);

if (document.getElementsByClassName('bottom_promo_blocks')[0]) {document.getElementsByClassName('bottom_promo_blocks')[0].parentNode.removeChild(document.getElementsByClassName('bottom_promo_blocks')[0]);}