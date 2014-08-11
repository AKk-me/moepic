(function($, t) {
  Comment = {
    spoiler: function(obj) {
      var text = $(obj).next('.spoilertext');
      var warning = $(obj).children('.spoilerwarning');
      obj.hide();
      text.show();
    },

    flag: function(id) {
      if(!confirm(t('.flag_ask')))
        return;

      notice(t('.flag_process'))

      $.ajax({
        url: Moebooru.path('/comment/mark_as_spam.json'),
        type: 'post',
        data: {
          'id': id,
          'comment[is_spam]': 1
        }
      }).done(function(resp) {
        notice(t('.flag_notice'));
      }).fail(function(resp) {
        var resp = $.parseJSON(resp.responseText)
        notice(t('js.error') + resp.reason);
      })
    },

    quote: function(id) {
      $.ajax({
        url: Moebooru.path('/comment/show.json'),
        type: 'get',
        data: {
          'id': id
        }
      }).done(function(resp) {
        var stripped_body = resp.body.replace(/\[quote\](?:.|\n|\r)+?\[\/quote\](?:\r\n|\r|\n)*/gm, '')
        var body = '[quote]' + resp.creator + ' '+ t('js.said') +'\n' + stripped_body + '\n[/quote]\n\n'
        $('#reply-' + resp.post_id).show()
        if ($('#respond-link-' + resp.post_id)) {
          $('#respond-link-' + resp.post_id).hide()
        }
        var reply_box = $('#reply-text-' + resp.post_id)
        reply_box.val(reply_box.val() + body);
        reply_box.focus();
      }).fail(function() {
        notice(t('.quote_error'))
      });
    },

    destroy: function(id) {
      if (!confirm(t('.delete_ask')) ) {
        return;
      }
      $.ajax({
        url: Moebooru.path('/comment/destroy.json'),
        type: 'post',
        data: { 'id': id }
      }).done(function(resp) {
        document.location.reload()
      }).fail(function(resp) {
        var resp = $.parseJSON(resp.responseText)
        notice(t('.delete_error') + resp.reason)
      });
    },

    show_reply_form: function(post_id)
    {
      $('#respond-link-' + post_id).hide();
      $('#reply-' + post_id).show();
      $('#reply-' + post_id).find('textarea').focus();
    }
  }
}) (jQuery, I18n.scopify('js.comment'));
