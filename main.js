$(function(){
    let pn = location.pathname;
    if (pn === '/home/') {
        let wordsTotal = 0;
        $.ajax({
            async: false,
            url: 'https://www.memrise.com/ajax/courses/dashboard/?courses_filter=learning&category_id=6',
            success: function(data) {
                let difficult = 0;
                let learned = 0;
                for (let i = 0; i < data.courses.length; i++) {
                    let course = data.courses[i];
                    difficult += course.difficult === undefined ? 0 : course.difficult;
                    learned += course.learned === undefined ? 0 : course.learned;
                }
                wordsTotal = learned - difficult;
            }
        });

        let wordsToday = 0;
        let d = new Date();
        let strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
        if (localStorage.getItem('today') === null
            || (localStorage.getItem('today') !== null && localStorage.getItem('today') !== strDate)) {
            localStorage.setItem('today', strDate);
            localStorage.setItem('wordsTotal', wordsTotal);
        } else {
            wordsToday = wordsTotal - localStorage.getItem('wordsTotal');
        }

        let goal = 4000;
        let perc = (wordsTotal / goal * 100).toFixed(1);

        $('.left .number').text(wordsTotal);
        $('.left .text').text('words all time');

        $('.right .number').text(wordsToday);
        $('.right .text').text('words today');

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
