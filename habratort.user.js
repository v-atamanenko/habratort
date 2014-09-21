// ==UserScript==
// @name        Хабраторт
// @description Возврат старого дизайна Хабрахабра
// @author      bbmm
// @version     1.0
// @include     http*://habrahabr.ru/*
// @match       *://habrahabr.ru/*
// ==/UserScript==

//Функции
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

//Переменные
var isUserLoggedIn = false;
if (hasClass(document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[1], 'tab_user') == true) {
	isUserLoggedIn = true;
}

var isReadOnly = false;
if (document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[4]) {
	if (document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[4].getAttribute("title") == 'Новая публикация в песочницу') {
		isReadOnly = true;
	}
}

if (isUserLoggedIn == true) {
	var userName = document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[1].getAttribute("title");
	var userLink = 'http://habrahabr.ru/users/' + userName + '/';
	var settingsLink = 'https://habrahabr.ru/auth/settings/';
	var logoutLink = document.getElementById('settings_tab').getElementsByClassName('exit')[0].href;
	var trackerLink = 'http://habrahabr.ru/tracker/';
	var favLink = 'http://habrahabr.ru/users/' + userName + '/favorites/';
	var trackerNotify = '';
	var dialogNotify = '';
	if (document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[2].getElementsByTagName('span')[0]) {
		//Уведомления от трекера
		trackerNotify = '+' + document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[2].getElementsByTagName('span')[0].innerHTML;
	}
	if (isReadOnly == false) {
		var dialogsLink = 'http://habrahabr.ru/conversations/';
		var votes = document.getElementById('user_tab').getElementsByClassName('text')[0].innerHTML;
		if (document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[1].getElementsByTagName('span')[0]) {
			//Уведомления о новых сообщениях
			dialogNotify = '+' + document.getElementsByClassName('nav_panel')[0].getElementsByTagName('a')[1].getElementsByTagName('span')[0].innerHTML;
		}
	}	
}

//Перестраиваем шапку на основе данных из левого меню
var feedActive = "";
var postsActive = "";
var sandyActive = "";
var hubsActive = "";
var compsActive = "";

var postAddButton = "";

if (window.location.href.indexOf("feed") >= 0) {
	feedActive = "active";
	if (isUserLoggedIn == true) { postAddButton = '<div class="add_post"><a href="/topic/add"></a></div>'; }
	if (isReadOnly == true) { postAddButton = '<div class="add_post"><a href="/sandbox/add"></a></div>'; }
} else if (window.location.href.indexOf("posts") >= 0) {
	postsActive = "active";
	if (isUserLoggedIn == true) { postAddButton = '<div class="add_post"><a href="/topic/add"></a></div>'; }
	if (isReadOnly == true) { postAddButton = '<div class="add_post"><a href="/sandbox/add"></a></div>'; }
} else if (window.location.href.indexOf("sandbox") >= 0) {
	sandyActive = "active";
} else if (window.location.href.indexOf("hubs") >= 0) {
	hubsActive = "active";
} else if (window.location.href.indexOf("companies") >= 0) {
	compsActive = "active";
}

var oldSchoolMainMenu = '<div class="main_menu"><a href="http://habrahabr.ru/feed/all/" class="'+ feedActive + '">лента</a><a href="http://habrahabr.ru/posts/top/" class="'+ postsActive + '">посты</a><a href="http://toster.ru/">q&a</a><a href="http://habrahabr.ru/sandbox/" class="'+ sandyActive + '">песочница</a><a href="http://habrahabr.ru/hubs/" class="'+ hubsActive + '">хабы</a><a href="http://habrahabr.ru/companies/" class="'+ compsActive + '">компании</a></div>';

if (isUserLoggedIn == false) {
	var oldSchoolHeader = '<div id="header"><div class="userpanel silver"><a href="http://habrahabr.ru/login/" class="login">войти</a> <a href="http://habrahabr.ru/register/">зарегистрироваться</a></div><a class="logo" href="http://habrahabr.ru/" title="На главную страницу"></a><div class="search"><form id="search_form" name="search" method="get" action="http://habrahabr.ru/search/"><input type="submit" value=""><input type="text" name="q" x-webkit-speech="" speech=""></form></div>' + oldSchoolMainMenu + '</div>';
} else if (isUserLoggedIn == true && isReadOnly == false) {
	var oldSchoolHeader = '<div id="header"><div class="userpanel silver"><a href="' + userLink + '" class="username">' + userName + '</a> <a href="' + settingsLink + '" class="nav-settings">настройки</a> <a href="' + logoutLink + '">выход</a><br><a href="'+ trackerLink +'" class="trackerLink">трекер</a><a href="" class="count" style="margin-right: 5px; margin-left: -7px;">' + trackerNotify + '</a> <a href="'+ dialogsLink +'" class="dialogsLink">диалоги</a><a href="" class="count" style="margin-right: 5px; margin-left: -7px;">' + dialogNotify + '</a> <a href="'+ favLink +'" class="favLink">избранное</a><br>'+ votes + '</div><a class="logo" href="http://habrahabr.ru/" title="На главную страницу"></a><div class="search"><form id="search_form" name="search" method="get" action="http://habrahabr.ru/search/"><input type="submit" value=""><input type="text" name="q" x-webkit-speech="" speech=""></form></div>' + oldSchoolMainMenu + '</div>';
} else if (isUserLoggedIn == true && isReadOnly == true) {
	var oldSchoolHeader = '<div id="header"><div class="userpanel silver"><a href="' + userLink + '" class="username">' + userName + '</a><sup><a href="/sandbox/add" class="charge">read-only</a></sup> <a href="' + settingsLink + '" class="nav-settings">настройки</a> <a href="' + logoutLink + '">выход</a><br><a href="'+ trackerLink +'" class="trackerLink">трекер</a><a href="" class="count" style="margin-right: 5px; margin-left: -7px;">' + trackerNotify + '</a> <a href="'+ favLink +'" class="favLink">избранное</a></div><a class="logo" href="http://habrahabr.ru/" title="На главную страницу"></a><div class="search"><form id="search_form" name="search" method="get" action="http://habrahabr.ru/search/"><input type="submit" value=""><input type="text" name="q" x-webkit-speech="" speech=""></form></div>' + oldSchoolMainMenu + '</div>';
}

var inner = document.getElementsByClassName('inner')[0].innerHTML;
document.getElementsByClassName('inner')[0].innerHTML = oldSchoolHeader + inner;

var contentLeft = document.getElementsByClassName('content_left')[0].innerHTML;
document.getElementsByClassName('content_left')[0].innerHTML = postAddButton + contentLeft;

//Удаляем новый стиль
var styles = document.getElementsByTagName('link');
while(styles.length > 0) {
    styles[0].parentNode.removeChild(styles[0]);
}

//Добавляем измененный старый стиль, удаляем меню слева, логотипы под футером и название страницы
document.getElementsByTagName('head')[0].innerHTML += '<link type="text/css" rel="stylesheet" href="https://bbmm.su/oldhabr/data/mega5.css?'+Math.random()+'">';

document.getElementById('navbar').style.display = 'none';
document.getElementById('navbar_overlay').style.display = 'none';

if (document.getElementsByClassName('page_head')[0]) {document.getElementsByClassName('page_head')[0].style.display = 'none'; }
if (document.getElementsByClassName('footer_logos')[0]) { document.getElementsByClassName('footer_logos')[0].style.display = 'none'; }

if (document.getElementsByClassName('bottom_promo_blocks')[0]) {document.getElementsByClassName('bottom_promo_blocks')[0].style.display = 'none';}

if (document.getElementsByClassName('block_after_post')[0]) {
	document.getElementsByClassName('sidebar_right')[0].innerHTML = document.getElementsByClassName('sidebar_right')[0].innerHTML + document.getElementsByClassName('block_after_post')[0].innerHTML;
	document.getElementsByClassName('block_after_post')[0].innerHTML = "";
}

if (document.getElementsByClassName('submit')[0]) { document.getElementsByClassName('submit')[0].disabled = false; }
if (document.getElementsByClassName('preview')[0]) { document.getElementsByClassName('preview')[0].disabled = false; }
if (document.getElementsByClassName('remove_button')[0]) { document.getElementsByClassName('remove_button')[0].disabled = false; }
if (document.getElementsByClassName('mark_read_button')[0]) { document.getElementsByClassName('mark_read_button')[0].disabled = false; }

var votings = document.getElementsByClassName('voting');
var i = 0;

for (;;) {
	if (i == votings.length) break;
	votings[i].appendChild(votings[i].getElementsByClassName('minus')[0]);
	i++;
}

//Oh, you wanna do this the hard way?! We'll do this the hard way!
document.body.innerHTML = document.body.innerHTML.replace(/публикация/g, 'пост');
document.body.innerHTML = document.body.innerHTML.replace(/2 публикации/g, '2 поста');
document.body.innerHTML = document.body.innerHTML.replace(/3 публикации/g, '3 поста');
document.body.innerHTML = document.body.innerHTML.replace(/4 публикации/g, '4 поста');
document.body.innerHTML = document.body.innerHTML.replace(/публикации/g, 'посты');
document.body.innerHTML = document.body.innerHTML.replace(/публикаций/g, 'постов');
document.body.innerHTML = document.body.innerHTML.replace(/Публикация/g, 'Пост');
document.body.innerHTML = document.body.innerHTML.replace(/Публикации/g, 'Посты');
document.body.innerHTML = document.body.innerHTML.replace(/Публикаций/g, 'Постов');
document.head.getElementsByTagName('title')[0].innerHTML = document.head.getElementsByTagName('title')[0].innerHTML.replace(/публикации/g, 'посты');