/**
 * Created by savchenko on 09.05.17.
 */

$(function(){
    var pn = location.pathname;
    if (pn == '/home/') {
    	var difficultWords = 0;
    	$('div.card-bottom > div > a.button.orange.disabled-click-thru.img-and-text > span.text').each(function (i, e) {
		difficultWords += parseInt($(e).text());
	});
	    
        var wordsTotal = 0;  
	$('div.card-main-container > div > div > div.wrapper > div > div.right > span').each(function (i, e) {
		wordsTotal += parseInt($(e).text().split(' / ')[0]);
	});
        $('.left .number').text(wordsTotal - difficultWords);
        $('.left .text').text('words all time');
        
        $('.right .text').text('words today');

        var d = new Date();
        var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
        if (localStorage.getItem('today') == null
            || (localStorage.getItem('today') != null && localStorage.getItem('today') != strDate)) {
            localStorage.setItem('today', strDate);
            localStorage.setItem('words', $('.left .number').text());
            $('.right .number').text(0);
        } else {
            $('.right .number').text($('.left .number').text() - localStorage.getItem('words'));
        }

        var goal = 4000;
        var perc = $('.left .number').text() / goal * 100;
        perc = perc.toFixed(1);

        $('.content-stats').after(
            '<div class="content-stats"><div class="left">' +
            '<p class="placeholder js-placeholder" style="display: none;"></p>' +
            '<p class="number js-num" style="display: block;">' + goal + '</p>' +
            '<p class="text">current goal</p></div><div class="center"></div><div class="right">' +
            '<p class="placeholder js-placeholder" style="display: none;"></p>' +
            '<p class="number js-num" style="display: block;">' + perc + ' %</p>' +
            '<p class="text">success</p></div></div>');
    }
});
