export { cereslibrary }

var cereslibrary = {};
(function()
{
    'use strict';

    this.reference = 1;
    this.notify = 2;
    this.error = 99;
    this.logtrace = false;
    this.isWindows = (navigator.appVersion.indexOf('Win') != -1);
    this.newline = this.isWindows ? '\r\n' : '\n';

    class Component
    {
        constructor()
        {
            this.type = function() { return type; },
            this.attribute = function() { return attribute; }
        }

    }

    let resource = new Component();

    setResourcePrecursors();

    this.logIt();

    this.logIt = function()
    {
        const stack = new Error().stack, caller = stack.split(this.newline)[2].trim();
        console.log(caller);
    }

    this.setHorizontalSwipe = function(touch, callback, args)
    {
        if (this.isEmptyOrNull(touch) || this.isEmptyOrNull(callback)) return this.inspect({ type: this.error, notification: resource.attribute.setHorizontalSwipe, logtrace: this.logtrace });

        const el = document.querySelector(touch.el);

        if (!touch.act) touch.act = 10;

        el.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; }, { passive: true } );

        el.addEventListener('touchmove', e => { e.preventDefault(); }, { passive: true });

        el.addEventListener('touchend', e =>
        {
            touch.end = e.changedTouches[0].screenX;

            if (Math.abs(touch.start - touch.end) > touch.act)
            {
                args.action = (touch.start > touch.end) ? true : false;
                callback.call(this, args);
            }

        }, { passive: true });

    }

    this.composeElement = function(element)
    {
        if (this.isEmptyOrNull(element)) return this.inspect({ type: this.error, notification: resource.attribute.composeElement, logtrace: this.logtrace });

        const el = document.createElement(element.el);

        el.id = element.id;
        element.parent.appendChild(el);

        if (element.classValue) this.composeAttribute({ id: el.id, type: 'class', value: element.classValue });
        if (element.onClickEventValue) this.composeAttribute({ id: el.id, type: 'onclick', value: element.onClickEventValue });
        if (element.url) this.composeAttribute({ id: el.id, type: 'src', value: element.url });
        if (element.accessibility) this.composeAttribute({ id: el.id, type: 'alt', value: element.accessibility });
        if (element.markup) document.getElementById(el.id).innerHTML = element.markup;
    }

    this.composeAttribute = function(attribute)
    {
        if (this.isEmptyOrNull(attribute)) return this.inspect({ type: this.error, notification: resource.attribute.composeAttribute, logtrace: this.logtrace });

        const el = document.getElementById(attribute.id);

        if (el)
        {
            const attributeNode = document.createAttribute(attribute.type);
            attributeNode.value = attribute.value;

            el.setAttributeNode(attributeNode);
        }

    }

    this.composeLinkElement = function(attribute)
    {
        if (this.isEmptyOrNull(attribute)) return this.inspect({ type: this.error, notification: resource.attribute.composeLinkElement, logtrace: this.logtrace });

        const link = document.createElement('link');

        if (attribute.rel) link.rel = attribute.rel;
        if (attribute.type) link.type = attribute.type;
        if (attribute.href) link.href = attribute.href;
        if (attribute.as) link.as = attribute.as;
        if (attribute.crossorigin) link.crossorigin = attribute.crossorigin;
        if (attribute.media) link.media = attribute.media;

        link.addEventListener('load', function() {}, false);

        document.head.appendChild(link);
    }

    this.windowOpen = function(obj)
    {
        if (this.isEmptyOrNull(obj)) return this.inspect({ type: this.error, notification: resource.attribute.windowOpen, logtrace: this.logtrace });

        window.open(obj.element.getAttribute('src'), obj.type);
    }

    this.isString = function(obj)
    {
        return Object.prototype.toString.call(obj) == '[object String]';
    }

    this.isEmptyOrNull = function(obj)
    {
        if (obj === null || obj == 'undefined') return true;

        if (this.isString(obj)) return (obj.length === 0 || !obj.trim());
        if (Array.isArray(obj)) return (obj.length === 0);
        if (obj.constructor === Object) return (Object.keys(obj).length === 0);

        return !obj;
    }

    this.getBooleanAttribute = function(attribute)
    {
        if (attribute === true || attribute === false) return attribute;
        if (this.isEmptyOrNull(attribute)) return false;
        if (!this.isString(attribute)) return false;

        const token = attribute.trim().toUpperCase();

        const lookup = {
            'TRUE': true,
            'T':  true,
            'YES': true,
            'Y': true,
            '1': true
        };

        return lookup[token] || false;
    }

    this.inspect = function(diagnostic)
    {
        if (this.isEmptyOrNull(diagnostic)) return this.inspect({ type: this.error, notification: resource.attribute.inspect, logtrace: this.logtrace });

        const lookup = {
            [this.reference]: function() { if (diagnostic.logtrace) console.log('Reference: ' + this.newline + this.newline + diagnostic.reference); },
            [this.notify]: function() { if (diagnostic.logtrace) console.log(diagnostic.notification); },
            [this.error]: function() { this.errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace } ); },
            'default': 'An unexpected error has occurred...'
        };

        return lookup[diagnostic.type]() || lookup['default'];
    }

    this.errorHandler = function(error)
    {
        if (this.isEmptyOrNull(error)) return this.inspect({ type: this.error, notification: resource.attribute.errorHandler, logtrace: this.logtrace });

        const err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
        console.log(err);

        if (error.alert) alert(err);

        return false;
    }

    function setResourcePrecursors()
    {
        const libraryName = 'cereslibrary';

        resource.attribute.setHorizontalSwipe = libraryName + ' error: The setHorizontalSwipe method touch or callback arguments are empty or null';
        resource.attribute.composeElement = libraryName + ' error: The composeElement method argument is empty or null';
        resource.attribute.composeAttribute = libraryName + ' error: The composeAttribute method argument is empty or null';
        resource.attribute.composeLinkElement = libraryName + ' error: The composeLink method argument is empty or null';
        resource.attribute.windowOpen = libraryName + ' error: The windowOpen method argument is empty or null';
        resource.attribute.inspect = libraryName + ' error: The inspect method argument is empty or null';
        resource.attribute.errorhandler = libraryName + ' error: The errorhandler method argument is empty or null';
    }

}).call(cereslibrary);
