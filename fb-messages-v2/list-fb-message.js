const FbMessage = require('./fb-message');

class ListElementEditor {
  /**
   * @param {object} element {title, subtitle, image_url, default_action, buttons}
   */
  constructor (element) {
    this.element = element;
  }

  /**
   * Add a URL button to this element. You may add at most 1 button (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/url-button
   * @param {string} url the URL to open when the button is tapped; must use HTTPS if messengerExtensions is true
   * @param {string} title button title, 20 character limit
   * @param {string} [height='full'] height ratio of the webview: compact, tall, full
   * @param {boolean} [extensions=false] must be true if using Messenger Extensions
   * @param {string} [fallbackUrl] the URL to use on clients that don't support Messenger Extensions
   * @param {string} [shareButton] set to 'hide' to disable the share button in the webview
   * @return {ListElementEditor} this
   */
  addUrlButton (url, title, height = 'full', extensions = false, fallbackUrl, shareButton) {
    if (!url) throw new Error('`url` is required');
    if (typeof url !== 'string') throw new TypeError('`url` must be a string');
    if (!title) throw new Error('`title` is required');
    if (typeof title !== 'string') throw new TypeError('`title` must be a string');
    if (title > 20) throw new Error('`title` is too long (max 20 chars)');
    if (!['compact', 'tall', 'full'].includes(height)) throw new Error('`height` must be one of: compact, tall, full');
    if (typeof extensions !== 'boolean') throw new TypeError('`extensions` must be a boolean');
    if (fallbackUrl && typeof url !== 'string') throw new TypeError('`fallbackUrl` must be a string');
    if (shareButton && typeof url !== 'string') throw new TypeError('`shareButton` must be a string');
    if (this.element.buttons.length >= 3) throw new Error('too many buttons (the maximum is 3)');

    this.element.buttons.push({
      type: 'web_url',
      url: url,
      title: title,
      webview_height_ratio: height,
      messenger_extensions: extensions,
      fallback_url: fallbackUrl,
      webview_share_button: shareButton
    });

    return this;
  }

  /**
   * Add a postback button to this element. You may add at most 1 button (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/postback-button
   * @param {string} title button title, 20 character limit
   * @param {string} payload custom data that will be sent back via webhook, 1000 character limit
   * @return {ListElementEditor} this
   */
  addPostbackButton (title, payload) {
    if (!title) throw new Error('`title` is required');
    if (typeof title !== 'string') throw new TypeError('`title` must be a string');
    if (title > 20) throw new Error('`title` is too long (max 20 chars)');
    if (!payload) throw new Error('`payload` is required');
    if (typeof payload !== 'string') throw new TypeError('`payload` must be a string');
    if (payload.length > 1000) throw new TypeError('`payload` is too long (max 1000 chars)');

    this.element.buttons.push({
      type: 'postback',
      title: title,
      payload: payload
    });

    return this;
  }

  /**
   * Add a call button to this element. You may add at most 1 button (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/call-button
   * @param {string} title button title, 20 character limit
   * @param {string} phoneNumber format must have "+" prefix followed by the country code, area code and local number
   * @return {ListElementEditor} this
   */
  addCallButton (title, phoneNumber) {
    if (!title) throw new Error('`title` is required');
    if (typeof title !== 'string') throw new TypeError('`title` must be a string');
    if (title > 20) throw new Error('`title` is too long (max 20 chars)');
    if (!phoneNumber) throw new Error('`phoneNumber` is required');
    if (typeof phoneNumber !== 'string') throw new TypeError('`phoneNumber` must be a string');

    this.element.buttons.push({
      type: 'phone_number',
      title: title,
      payload: phoneNumber
    });

    return this;
  }

  /**
   * Add a share button to this element. You may add at most 1 button (in total).
   *
   * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference/share-button
   * @param {object} [contents] the message that the recipient of the share should see (a generic template)
   * @return {ListElementEditor} this
   */
  addShareButton (contents) {
    this.element.buttons.push({
      type: 'element_share',
      share_contents: contents
    });

    return this;
  }
}

/**
 * @see https://developers.facebook.com/docs/messenger-platform/send-messages/template/list
 */
class ListFbMessage extends FbMessage {
  /**
   * @param {string} [topElementStyle='large'] value must be: large, compact
   */
  constructor (topElementStyle = 'large') {
    super();

    if (!['large', 'compact'].includes(topElementStyle)) {
      throw new Error('`topElementStyle` must be one of: large, compact');
    }

    this.elements = [];
    this.topElementStyle = topElementStyle;
  }

  /**
   * Add an element to this gallery carousel. You may add at least 2 and at most 4 elements.
   *
   * @param {string} title button title, 80 character limit
   * @param {string} [subtitle] button subtitle, 80 character limit
   * @param {string} [imageUrl] element image URL
   * @param {object} [defaultAction] default action to be triggered when the user taps on the element
   * @return {ListElementEditor} this
   */
  addElement (title, subtitle, imageUrl, defaultAction) {
    if (!title) throw new Error('`title` is required');
    if (typeof title !== 'string') throw new TypeError('`title` must be a string');
    if (title > 80) throw new Error('`title` is too long (max 80 chars)');
    if (subtitle && typeof subtitle !== 'string') throw new TypeError('`subtitle` must be a string');
    if (subtitle && subtitle > 80) throw new Error('`subtitle` is too long (max 80 chars)');
    if (imageUrl && typeof imageUrl !== 'string') throw new TypeError('`imageUrl` must be a string');
    if (this.elements.length >= 4) throw new Error('too many elements (the maximum is 4)');

    const elem = {
      title: title,
      subtitle: subtitle,
      image_url: imageUrl,
      default_action: defaultAction,
      buttons: []
    };

    this.elements.push(elem);
    return new ListElementEditor(elem);
  }

  render () {
    // TODO add support for global button
    // if (this.buttons.length > 1) {
    //   throw new Error('You may add at most 1 global button');
    // }
    if (this.elements.length < 2) {
      throw new Error('You must add at least 2 elements');
    }
    if (this.elements.length > 4) {
      throw new Error('You may add at most 4 elements');
    }

    return {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'list',
          top_element_style: this.topElementStyle,
          elements: this.elements,
          buttons: this.buttons
        }
      }
    };
  }
}

module.exports = ListFbMessage;
