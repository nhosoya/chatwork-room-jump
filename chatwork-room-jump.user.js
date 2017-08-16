// ==UserScript==
// @name         chatwork-room-jump
// @namespace    https://github.com/nhosoya
// @version      0.0.1
// @description  Jump!!!
// @author       nhosoya
// @match        https://www.chatwork.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/keymaster/1.6.1/keymaster.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.8.2/jquery.modal.min.js
// @resource     jqueryModal https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.8.2/jquery.modal.min.css
// @resource     select2 https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';

    const select2 = GM_getResourceText('select2');
    GM_addStyle(select2);
    const jqueryModal = GM_getResourceText('jqueryModal');
    GM_addStyle(jqueryModal);

    let open = function() {
        var $eventSelect = $(".js-example-events");
        $eventSelect.on("select2:select", function (e) {
            $('*[data-rid="' + e.params.data.id + '"]').trigger('click');
            $.modal.close();
            return true;
        });
        $('#hogehoge').val('').trigger('change');
        // $('#hogehoge').select2("val", "");
        $('#fuga').modal();
        $('#hogehoge').select2('open');
    };

    let jump = function() {
        $('#fuga').remove();
        // $('.select2-selection__rendered').remove();
        let box = [];
        box.push('<div id="fuga" style="display:none;"><select id="hogehoge" class="js-example-events js-example-placeholder-single">');
        // let readRooms = $('.roomListItem__roomName.roomListItem__roomName--noBadge');
        let unreadRooms = $('.roomListItem__roomName.roomListItem__roomName--unread');
        let unreadRoomTitles = $.map(unreadRooms, function(room) {
            var rid = $(room).closest('._roomLink').data('rid');
            box.push('<option value="' + rid + '">' + room.textContent + '</option>');
            return room.textContent + rid;
        });
        box.push('</select></div>');
        $('body').after(box.join(' '));
        $('#hogehoge').select2({
            placeholder: 'Jump to...',
            width: '100%',
            allowClear: true
        });
        open();
        return false;
    };

    key('⌘+k, ctrl+k', jump);
})();
