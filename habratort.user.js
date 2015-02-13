// ==UserScript==
// @name        Хабраторт
// @id          habratort
// @description Возврат старого дизайна Хабрахабра
// @author      bbmm
// @version     2.0
// @include     http*://habrahabr.ru/*
// @match       *://habrahabr.ru/*
// ==/UserScript==

//Функция для проверки наличия класса
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

//Переменные
var isUserLoggedIn = hasClass(document.getElementsByClassName('tab')[0], 'tab_user');

if (isUserLoggedIn == true) {
	var isReadOnly = (document.getElementsByClassName('tab_add_post')[0].href == 'http://habrahabr.ru/sandbox/add/');
	var userName = document.getElementsByClassName('tab_user')[0].getAttribute('title');

	var userLink = 'http://habrahabr.ru/users/' + userName + '/';
	var settingsLink = 'https://habrahabr.ru/auth/settings/';
	var logoutLink = document.getElementsByClassName('exit')[0].href;
	var trackerLink = 'http://habrahabr.ru/tracker/';
	var favLink = 'http://habrahabr.ru/users/' + userName + '/favorites/';
	
	var trackerNotify = '';
	var dialogNotify = '';
	if (document.getElementsByClassName('navbar_count_tracker_total')[0].innerHTML != '') {
		//Уведомления от трекера
		trackerNotify = '+' + document.getElementsByClassName('navbar_count_tracker_total')[0].innerHTML;
	}
	if (isReadOnly == false) {
		var dialogsLink = 'http://habrahabr.ru/conversations/';
		var votes = document.getElementById('user_tab').getElementsByClassName('text')[0].innerHTML;
		if (document.getElementsByClassName('navbar_count_new_messages')[0].innerHTML != '') {
			//Уведомления о новых сообщениях
			dialogNotify = '+' + document.getElementsByClassName('navbar_count_new_messages')[0].innerHTML;
		}
	}	
}

//Строим шапку на основе данных из нового меню
var feedActive = '';
var postsActive = '';
var sandboxActive = '';
var hubsActive = '';
var compsActive = '';

var postAddButton = '';

if (window.location.href.indexOf('feed') >= 0) {
	feedActive = 'active';
	if (isUserLoggedIn == true) { postAddButton = '<div class="add_post"><a href="/topic/add"></a></div>'; }
	if (isReadOnly == true) { postAddButton = '<div class="add_post"><a href="/sandbox/add"></a></div>'; }
} else if (window.location.href.indexOf('posts') >= 0) {
	postsActive = 'active';
	if (isUserLoggedIn == true) { postAddButton = '<div class="add_post"><a href="/topic/add"></a></div>'; }
	if (isReadOnly == true) { postAddButton = '<div class="add_post"><a href="/sandbox/add"></a></div>'; }
} else if (window.location.href.indexOf('sandbox') >= 0) {
	sandboxActive = 'active';
} else if (window.location.href.indexOf('hubs') >= 0) {
	hubsActive = 'active';
} else if (window.location.href.indexOf('companies') >= 0) {
	compsActive = 'active';
}

var oldSchoolMainMenu = '<div class="main_menu"><a href="http://habrahabr.ru/feed/all/" class="'+ feedActive + '">лента</a><a href="http://habrahabr.ru/posts/top/" class="'+ postsActive + '">посты</a><a href="http://toster.ru/">q&a</a><a href="http://habrahabr.ru/sandbox/" class="'+ sandboxActive + '">песочница</a><a href="http://habrahabr.ru/hubs/" class="'+ hubsActive + '">хабы</a><a href="http://habrahabr.ru/companies/" class="'+ compsActive + '">компании</a></div>';
var oldSchoolHeader = '<div id="header"><div class="userpanel silver">';

if (isUserLoggedIn == false) {
	oldSchoolHeader += '<a href="http://habrahabr.ru/login/" class="login">войти</a> <a href="http://habrahabr.ru/register/">зарегистрироваться</a></div><a class="logo mainpage" href="http://habrahabr.ru/" title="На главную страницу"></a><div class="search"><form id="search_form" name="search" method="get" action="http://habrahabr.ru/search/"><input type="submit" value=""><input type="text" name="q" x-webkit-speech="" speech=""></form></div>' + oldSchoolMainMenu + '</div>';
} else {
	oldSchoolHeader += '<a href="' + userLink + '" class="username">' + userName + '</a>';
	if (isReadOnly == true) {
		oldSchoolHeader += '<sup><a href="/sandbox/add" class="charge">read-only</a></sup> <a href="' + settingsLink + '" class="nav-settings">настройки</a> <a href="' + logoutLink + '">выход</a><br><a href="'+ trackerLink +'" class="trackerLink">трекер</a><a href="" class="count" style="margin-right: 5px; margin-left: -7px;">' + trackerNotify + '</a> <a href="'+ favLink +'" class="favLink">избранное</a></div><a class="logo mainpage" href="http://habrahabr.ru/" title="На главную страницу"></a><div class="search"><form id="search_form" name="search" method="get" action="http://habrahabr.ru/search/"><input type="submit" value=""><input type="text" name="q" x-webkit-speech="" speech=""></form></div>' + oldSchoolMainMenu + '</div>';
	} else {
		oldSchoolHeader += '<a href="' + settingsLink + '" class="nav-settings">настройки</a> <a href="' + logoutLink + '">выход</a><br><a href="'+ trackerLink +'" class="trackerLink">трекер</a><a href="" class="count" style="margin-right: 5px; margin-left: -7px;">' + trackerNotify + '</a> <a href="'+ dialogsLink +'" class="dialogsLink">диалоги</a><a href="" class="count" style="margin-right: 5px; margin-left: -7px;">' + dialogNotify + '</a> <a href="'+ favLink +'" class="favLink">избранное</a><br>'+ votes + '</div><a class="logo mainpage" href="http://habrahabr.ru/" title="На главную страницу"></a><div class="search"><form id="search_form" name="search" method="get" action="http://habrahabr.ru/search/"><input type="submit" value=""><input type="text" name="q" x-webkit-speech="" speech=""></form></div>' + oldSchoolMainMenu + '</div>';
	}
}

document.getElementsByClassName('inner')[0].innerHTML = oldSchoolHeader + document.getElementsByClassName('inner')[0].innerHTML;
document.getElementsByClassName('content_left')[0].innerHTML = postAddButton + document.getElementsByClassName('content_left')[0].innerHTML;

document.getElementById('layout').id = 'wrapper';
document.getElementsByClassName('inner')[0].id = 'layout';
document.getElementsByClassName('inner')[0].classList.remove('inner');

document.getElementsByTagName('head')[0].innerHTML += '<link type="text/css" rel="stylesheet" href="https://bbmm.su/oldhabr/style.css">';

document.getElementById('navbar').style.display = 'none';
document.getElementById('navbar_overlay').style.display = 'none';

if (document.getElementsByClassName('page_head')[0]) { document.getElementsByClassName('page_head')[0].style.display = 'none'; }
if (document.getElementsByClassName('menu special')[0]) { document.getElementsByClassName('menu special')[0].style.display = 'none'; }
if (document.getElementsByClassName('footer_logos')[0]) { document.getElementsByClassName('footer_logos')[0].style.display = 'none'; }
if (document.getElementsByClassName('bottom_promo_blocks')[0]) {document.getElementsByClassName('bottom_promo_blocks')[0].style.display = 'none';}
if (document.getElementsByClassName('block_after_post')[0]) {
	document.getElementsByClassName('sidebar_right')[0].innerHTML = document.getElementsByClassName('sidebar_right')[0].innerHTML + document.getElementsByClassName('block_after_post')[0].innerHTML;
	document.getElementsByClassName('block_after_post')[0].innerHTML = '';
}

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