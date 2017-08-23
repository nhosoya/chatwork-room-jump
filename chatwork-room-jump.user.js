// ==UserScript==
// @name         chatwork-room-jump
// @namespace    https://github.com/nhosoya
// @version      0.0.2
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
        $(".js-example-events").on("select2:select", function (e) {
            $('*[data-rid="' + e.params.data.id + '"]').trigger('click');
            $.modal.close();
        });
        $('#unread-rooms').val('').trigger('change');
        $('#modal-wrapper').modal();
        $('#unread-rooms').select2('open');
    };

    let jump = function() {
        $('#modal-wrapper').remove();
        let box = [];
        box.push('<div id="modal-wrapper" style="display:none;"><select id="unread-rooms" class="js-example-events js-example-placeholder-single">');
        let unreadRooms = $('.roomListItem__roomName.roomListItem__roomName--unread');
        let unreadRoomTitles = unreadRooms.each(function(index) {
            var rid = $(this).closest('._roomLink').data('rid');
            box.push('<option value="' + rid + '">' + this.textContent + '</option>');
        });
        box.push('</select></div>');
        $('body').after(box.join(' '));
        $('#unread-rooms').select2({
            placeholder: 'Jump to...',
            width: '100%',
            allowClear: true
        });
        open();
        return false;
    };

    key('⌘+k, ctrl+k', jump);

    $('#_chatText').keydown(function(e) {
      if ((event.ctrlKey || event.metaKey) && e.keyCode == 75) {
        jump();
      }
    });
})();
