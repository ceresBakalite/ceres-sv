/**
 * @license
 * ceres-rsc v1.0.0
 *
 * Minified using terser v5.5.1
 * Original file: ceresbakalite/ceres-sv/repos/csvjs/ceres-rsc.js
 *
 * ceresBakalite/ceres-rsc is licensed under the MIT License - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2018 - 2020 Alexander Munro
*/

export { ceresSlideViewResourceLibrary as rsc }

var ceresSlideViewResourceLibrary = {}; // ceres slideview resource object namespace
(function() { // methods belonging to the ceres-sv resource object

    this.reference   = 1;
    this.notify      = 2;
    this.warn        = 3;
    this.default     = 98;
    this.error       = 99;
    this.defaultCSS  = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
    this.commaCodes  = /,|&comma;|&#x2c;|&#44;|U+0002C/g;
    this.commaSymbol = '_&c';
    this.bArray      = ['true', '1', 'enable', 'confirm', 'grant', 'active', 'on', 'yes']; // typeof string property
    this.elArray     = ['link', 'script', 'style'];
    this.isWindows   = navigator.appVersion.indexOf('Win') != -1;
    this.newline     = this.isWindows ? '\r\n' : '\n';
    this.docHead     = this.elArray.map(item => item.trim().toUpperCase() );
    this.bool        = this.bArray.map(item => item.trim().toUpperCase() );

    this.fileType     = (path, type) => this.fileExt(path).toUpperCase() === type.toUpperCase();
    this.fileName     = path => path.substring(path.lastIndexOf('/')+1, path.length);
    this.fileExt      = path => path.substring(path.lastIndexOf('.')+1, path.length);
    this.mediaType    = path => this.media.get(this.fileExt(path).toLowerCase());
    this.isVideo      = path => this.media.has(this.fileExt(path).toLowerCase());
    this.isString     = obj => Object.prototype.toString.call(obj) == '[object String]';
    this.srcOpen      = obj => globalThis.open(obj.element.getAttribute('src'), obj.type);
    this.elementName  = node => node.nodeName.toLocaleLowerCase();
    this.clearElement = node => { while (node.firstChild) node.removeChild(node.firstChild); }

    this.softSanitize = (text, type = 'text/html') => this.ignore(text) ? null : new DOMParser()
        .parseFromString(text, type).documentElement.textContent
        .replace(/</g, '&lt;');

    this.ignore = obj => (obj === null || obj == 'undefined') ? true
        : this.isString(obj) ? (obj.length === 0 || !obj.trim())
        : Array.isArray(obj) ? (obj.length === 0)
        : (obj && obj.constructor === Object) ? Object.keys(obj).length === 0
        : !obj;

    this.getBoolean = obj => (obj === true || obj === false) ? obj
        : (this.ignore(obj) || !this.isString(obj)) ? false
        : this.bool.includes(obj.trim().toUpperCase());

    this.media = new Map();
    this.media.set('mp4', 'video/mp4');
    this.media.set('m4v', 'video/m4v');
    this.media.set('ogg', 'video/ogg');
    this.media.set('ogv', 'video/ogg');
    this.media.set('webm', 'video/webm');

    this.composeElement = (obj, atr) => {

        if (this.ignore(obj.nodeType)) return;

        const precursor = this.docHead.includes(obj.nodeType.trim().toUpperCase()) ? document.head : (obj.parent || document.body);
        const node = document.createElement(obj.nodeType);

        Object.entries(atr).forEach(([key, value]) => { if (value) node.setAttribute(key, value); });

        if (obj.markup) node.insertAdjacentHTML('afterbegin', obj.markup);
        if (obj.nodeType === 'video') this.composeVideo(node, obj.src, obj.type);

        precursor.appendChild(node);
    }

    this.composeVideo = (node, src, type) => {

        const observer = new IntersectionObserver(entries => { // play when visible

            entries.forEach(entry => { entry.isIntersecting ? node.play() : node.pause() });

        }, {});

        const source = document.createElement('source');
        source.setAttribute('src', src);
        source.setAttribute('type', type);

        node.appendChild(source);

        observer.observe(node);
    }

    this.setSwipe = (touch, callback, args) => { // horizontal swipe

        if (!touch.act) touch.act = 80;

        touch.node.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; }, { passive: true });
        touch.node.addEventListener('touchmove', e => { e.preventDefault(); }, { passive: true });
        touch.node.addEventListener('touchend', e => {

            touch.end = e.changedTouches[0].screenX;

            if (Math.abs(touch.start - touch.end) > touch.act) {

                args.action = (touch.start > touch.end);
                callback.call(this, args);
            };

        }, { passive: true });

    }

    // noddy regex comma separated value parser - can return either a json or an array construct
    this.parseCSV = (text, symbol = {}) => {

        const textArray = text.split('\n'); // this assumes incorrectly that line breaks only occur at the end of rows
        const newArray  = new Array(textArray.length);
        const endSymbol = '_&grp;';

        const reA = new RegExp(endSymbol + '\s*?$', 'g'); // match end symbols & whitespace at the end of a row
        const reB = /"[^]*?",|"[^]*?"$/gm; // match character groups in need of parsing
        const reC = /"\s*?$|"\s*?,\s*?$/; // match trailing quotes & commas & whitespace
        const reD = /^\s*?"/; // match leading quotes & whitespace
        const reE = /""/g; // match two ajoining double quotes
        const reF = /(?!\s)[,](?!\s)/g; // match whitespace surrounding a comma
        const reG = /,\s*?$/; // match trailing comma & whitespace
        const reH = /"/g; // match double quotes

        const parseGroup = group => {

            let newGroup = String(group)
                .replace(reC, '') // remove trailing quotes & commas & whitespace
                .replace(reD, ''); // remove leading quotes & whitespace

            newGroup = newGroup.replace(reE, '"'); // replace two ajoining double quotes with one double quote

            return newGroup.replace(symbol.commaCodes, symbol.commaSymbol) + endSymbol; // replace any remaining comma codes with a separator symbol
        }

        const parseRow = row => {

            let newRow = row.replace(reA, ''); // remove end symbols & whitespace at the end of a row
            newRow = newRow.replaceAll(endSymbol, ', '); // replace any remaining end symbols inside character groups with a comma value separator

            return newRow.replace(reF, ', '); // replace comma & surrounding whitespace
        }

        // construct a JSON object from the CSV construct
        const composeJSON = () => {

            const nodeName = i => symbol.nodes[i] ? '"' + symbol.nodes[i] + '": ' : '"node' + i+1 + '": ';

            let str = '';

            newArray.forEach(row => {

                if (!rsc.ignore(row)) {

                    str += '{ ';
                    let rowArray = row.split(',');

                    rowArray.forEach((value, i) => { str += nodeName(i) + '"' + value.trim().replace(reH, '\\"') + '", '; }); // replace quotes with escaped quotes
                    str = str.replace(reG, '') + ' },\n'; // replace trailing comma & whitespace
                };

            });

            return '[' + str.replace(reG, '') + ']'; // replace trailing comma & whitespace
        }

        const objectType = () => (symbol.json || symbol.nodes) ? composeJSON() : newArray.join('\n');

        textArray.forEach(row => {

            let newRow = String(row);
            let groups = [...newRow.matchAll(reB)]; // get character groups in need of parsing

            groups.forEach(group => {

                let newGroup = parseGroup(group);
                newRow = newRow.replace(group, newGroup);
            });

            newArray.push(parseRow(newRow));
        });

        return objectType();

    } // end CSV parser

    this.getUniqueId = obj => {

        if (!obj.name) obj.name = 'n';
        if (!obj.range) obj.range = 100;

        const elName = () => obj.name + Math.floor(Math.random() * obj.range);
        while (document.getElementById(obj.el = elName())) {};

        return obj.el;
    }

    this.removeDuplcates = (obj, sort) => {

        const key = JSON.stringify;
        const ar = [...new Map (obj.map(node => [key(node), node])).values()];

        return sort ? ar.sort((a, b) => a - b) : ar;
    }

    this.inspect = diagnostic => {

        const errorHandler = error => {

            const err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
            console.error(err);

            if (error.alert) alert(err);
        }

        const lookup = {

            [this.notify]    : () => { if (diagnostic.logtrace) console.info(diagnostic.notification); },
            [this.warn]      : () => { if (diagnostic.logtrace) console.warn(diagnostic.notification); },
            [this.reference] : () => { if (diagnostic.logtrace) console.log('Reference: ' + this.newline + this.newline + diagnostic.notification); },
            [this.error]     : () => errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace }),
            [this.default]   : () => errorHandler({ notification: 'Unhandled exception' })
        };

        lookup[diagnostic.type]() || lookup[this.default];
    }

    this.getProperties = (string = {}, str = '') => {

        for (let literal in string) str += literal + ': ' + string[literal] + ', ';
        return str.replace(/, +$/g,'');
    }

}).call(ceresSlideViewResourceLibrary); // end resource object namespace
