$(document).ready(function() {
    const uiElements = {
        'Survival Hud': '#hud-container',
        'Location': '#location-ui',
        'Speedometer': '#speedometer'
    };

    $('.setting-item').each(function() {
        const $item = $(this);
        const title = $item.find('.setting-title').text().trim();
        const $onBtn = $item.find('.on');
        const $offBtn = $item.find('.off');

        $onBtn.addClass('active');
        $offBtn.addClass('inactive');

        if (uiElements[title]) {
            $(uiElements[title]).show();
        }
    });

    $('.setting-item button').on('click', function() {
        const $btn = $(this);
        const $item = $btn.closest('.setting-item');
        const title = $item.find('.setting-title').text().trim();
        const $onBtn = $item.find('.on');
        const $offBtn = $item.find('.off');

        if ($btn.hasClass('on')) {
            $onBtn.removeClass('inactive').addClass('active');
            $offBtn.removeClass('active').addClass('inactive');
            if (uiElements[title]) {
                $(uiElements[title]).show();
            }
        } else if ($btn.hasClass('off')) {
            $offBtn.removeClass('inactive').addClass('active');
            $onBtn.removeClass('active').addClass('inactive');
            if (uiElements[title]) {
                $(uiElements[title]).hide();
            }
        }
    });

    window.addEventListener('message', function(event) {
        const data = event.data;
        if (data.action === 'showSettings') {
            $('#settings-container').removeClass('hidden');
        } else if (data.action === 'hideSettings') {
            $('#settings-container').addClass('hidden');
        }
    });

    $(document).on('keydown', function(event) {
        if (event.keyCode === 27) { // ESC key
            $('#settings-container').addClass('hidden');
            $.post('https://qz_ui/hideSettings', JSON.stringify({}));
        }
    });
});