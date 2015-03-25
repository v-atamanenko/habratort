// ==UserScript==
// @name        Хабраторт
// @id          habratort
// @description Возврат старого дизайна Хабрахабра
// @author      bbmm
// @version     2.1
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

document.getElementsByTagName('head')[0].innerHTML += '<style>body{background:#fff}#layout{text-align:left;margin:0 auto;padding:0 35px;border:0;position:relative}#footer,#layout{width:1200px;min-width:600px}#header{margin-top:35px;text-align:center;position:relative;padding-bottom:24px;padding-top:10px}#header .logo{margin:0 auto;background:url(http://web.archive.org/web/20140414133744/http://habrahabr.ru/images/bg-multilogo.png) -76px -127px;display:block;height:140px;width:111px}#header .logo.mainpage{width:240px;height:140px;background:url(http://web.archive.org/web/20140414133744/http://habrahabr.ru/images/bg-multilogo.png)}#header .userpanel{position:absolute;left:0;top:10px;width:350px;border:0 solid green;text-align:left;font-family:arial}#header .userpanel a{margin-right:10px}#header .userpanel a.username{font-weight:700;margin-right:0}#header .userpanel a.count{color:#390;text-decoration:none;margin-left:-9px;font-size:11px}#header .userpanel sup{color:#999;font-size:11px;vertical-align:super}#header .userpanel sup a{margin-right:0}#header .userpanel a.nav-settings{margin-left:10px}#header .userpanel .top{margin-bottom:1px}#header .userpanel .bottom{margin-bottom:5px}#header .userpanel .charge{font-size:11px;line-height:13px;color:#999}#header .userpanel .not.habrauser-newmail{background:url(http://web.archive.org/web/20140414125415/http://habrahabr.ru/images/icos/new-message.gif) 0 2px no-repeat;margin-left:-21px;padding-left:21px}#header .search{position:absolute;right:0;top:32px;width:30%;border:0 solid green}#header .search form{width:280px;float:right}#header .search form input[type=text]{font-size:12px;font-family:arial;border:1px solid #D1D1D1;background:#fff;color:#333;padding:2px 4px;height:15px;width:226px;float:right;display:block}#header .search form input[type=submit]{border:0;background:url(http://web.archive.org/web/20140414125415/http://habrahabr.ru/images/bg-button-enter.png) no-repeat;width:21px;height:21px;display:block;float:right;margin-left:5px}#header .main_menu{text-align:left;font-size:30px;font-family:Verdana,sans-serif;text-transform:lowercase;padding-top:15px;overflow:hidden}#header .main_menu a{margin-right:24px;display:block;float:left}#header .main_menu a.active{text-decoration:none;color:#000}#header .main_menu .banner_special{float:left;position:relative;top:-4px;width:135px;height:35px}.content_left{float:left;margin-right:20px;width:880px!important;padding-right:0}.sidebar_right{float:left;width:300px;margin-left:0}.sidebar_right .block{font-family:tahoma,arial;padding:15px 20px;margin-bottom:20px;background:#f0f0e7;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}.content_left table.menu{width:100%}.content_left table.menu tr td{text-align:center;border-right:1px solid #fff;border-bottom:1px solid #fff;line-height:19px;white-space:nowrap}.content_left table.menu tr td a,.content_left table.menu tr td span.disabled{display:block;padding:7px 15px 0;height:28px;font-size:16px;background:#EAECEA;color:#666;-webkit-border-top-left-radius:10px;-webkit-border-top-right-radius:10px;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;border-top-left-radius:10px;border-top-right-radius:10px;text-decoration:none}.content_left table.menu tr td a .name{text-decoration:underline}.content_left table.menu tr td a:hover{color:#a3a3a3}.content_left table.menu tr td.active{border-bottom:1px solid #D3E2F0}.content_left table.menu tr td.active a{color:#000;background:#D3E2F0;text-decoration:none}.content_left table.menu tr td.active a .name{text-decoration:none}.content_left table.menu tr td span.disabled{color:#bbb}.content_left table.menu tr td span.count_new{color:green}.content_left .submenu{margin-bottom:20px;float:left;overflow:hidden;padding:0 3px;background:#D3E2F0;color:#666;margin-right:1px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;border-bottom-left-radius:10px;border-bottom-right-radius:10px}.content_left .submenu.right{float:right}.content_left .submenu .item{float:left;padding:6px 7px}.content_left .submenu .item a{color:#666;text-decoration:none}.content_left .submenu .item a .name{text-decoration:underline}.content_left .submenu .item a:hover{color:#a3a3a3}.content_left .submenu .item.active,.content_left .submenu .item.active a{color:#000}.content_left .submenu .item.active a .name{text-decoration:none}.content_left .submenu .item .count_new{color:green}</style>';

document.getElementById('navbar').style.display = 'none';
document.getElementById('navbar_overlay').style.display = 'none';

if (document.getElementsByClassName('page_head')[0] && (window.location.href.indexOf('conversations') < 0)) { document.getElementsByClassName('page_head')[0].style.display = 'none'; }
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