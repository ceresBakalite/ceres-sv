/**
 * @license
 * ceres v1.0.0
 *
 * Minified using terser v5.5.1
 * Original file: ceresbakalite/ceres-sv/repos/csvjs/ceres-sv.js
 *
 * ceresBakalite/ceres-sv is licensed under the MIT License - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2018 - 2020 Alexander Munro
*/

import { rsc } from '../prod/ceres-rsc.min.js'; // ceres slideview resource object namespace

globalThis.ceres = {}; // ceres slideview global (actual or proxy) object namespace
(() => {

    globalThis.customElements.define('ceres-sv', class extends HTMLElement { // ceres-sv HTML namespace DOM subtree class

        async connectedCallback() {

            ceres.getImage = el => rsc.srcOpen({ element: el, type: 'image' }); // HTML namespace DOM subtree method reference
            ceres.getSlide = el => atr.get.slide({ node: el }); // HTML namespace DOM subtree method reference

            const cfg = {}; // configuration object namespace
            const atr = {}; // attribute object namespace

            initialise(this); // a slideview root node of the DOM subtree

            atr.setDisplay.hide();

            if (cfg.srcRoot) this.insertAdjacentHTML('afterbegin', atr.parseFile( await ( await fetch(cfg.src) ).text() ));

            for (let url of cfg.cssRoot) { cfg.shadowStyle += rsc.softSanitize( await ( await fetch(url) ).text() ); }

            if (atr.instance.hasContent()) atr.instance.showContent();

            function initialise(csvRoot) {

                csvRoot.src = csvRoot.getAttribute('src');

                cfg.src         = rsc.ignore(csvRoot.src) ? null : csvRoot.src.trim();
                cfg.css         = csvRoot.getAttribute('css') || rsc.defaultCSS;
                cfg.srcRoot     = !rsc.ignore(cfg.src);
                cfg.shadowStyle = '';
                cfg.node        = {};
                cfg.slide       = 1;

                cfg.cssRoot = rsc.removeDuplcates(cfg.css.trim()
                    .replace(/,/gi, ';')
                    .replace(/;+$/g, '')
                    .replace(/[^\x00-\xFF]| /g, '')
                    .split(';'));

                (function() { // methods belonging to the attribute object

                    const csv = rsc.elementName(csvRoot); // the UTF-16 lowercase ceres sideview element name in the HTML namespace DOM subtree
                    const srm = new Map(); // shadowroot manager

                    const remark = {

                        markup     : 'Media list markup',
                        element    : 'The element attributes',
                        nodeSearch : 'The ' + csv + ' src attribute url is unavailable and there is no node name. Looking for the first occurance of a <template> or <noscript> tagname',
                        properties : 'Error: Unable to find the ' + csv + ' document element',
                        list       : 'Error: Unable to find either the ' + csv + ' document element nor the fallback local template elements',
                        template   : 'Error: Unable to find the local fallback template element when searching the document body',
                        cache      : 'Warning: cache response status'
                    };

                    Object.freeze(remark);

                    this.instance = { // an instance of the custom HTMLElement extension

                        hasContent: () => {

                            return !this.content.properties() ? rsc.inspect({ type: rsc.error, notification: remark.properties })
                                : !this.content.textList() ? rsc.inspect({ type: rsc.error, notification: remark.list })
                                : this.content.textArray();
                        },

                        showContent: () => {

                            this.get.shadow();
                            this.get.slide({ shadow: cfg.shadow });
                            this.get.view();
                        }

                    };

                    this.content = { // the custom HTMLElement extension properties

                        properties: () => {

                            const styleAttributes = ['color', 'font', 'padding', 'top', 'bottom'];  // configurable styles
                            const styleProperties = ['sub', 'sur']; // style compliant properties

                            const getTemplate = () => {

                                if (cfg.srcRoot) return 'undefined';

                                let el = document.getElementById(cfg.node.name) || null;

                                if (rsc.ignore(el)) {

                                    rsc.inspect({ type: rsc.notify, notification: remark.nodeSearch, logtrace: cfg.node.trace });
                                    el = document.getElementsByTagName('template')[0] || document.getElementsByTagName('noscript')[0];
                                };

                                return el || 'undefined'; // typeof string property
                            }

                            const getCSVRootProperties = () => {

                                if (rsc.ignore(csvRoot)) return false;

                                csvRoot.id = rsc.getUniqueId({ name: csv, range: 1000 });

                                const getProperty = name => {

                                    const factor = csvRoot.getAttribute(name);
                                    const evaluate = (name == 'cache' || name == 'zoom');

                                    const evalAttribute = () => {

                                        if (name == 'cache') {

                                            const media = atrArray.length > 1 ? atrArray[1].includes('media') : item.includes('media') || null;
                                            const cache = item.includes('media') || rsc.getBoolean(item);

                                            if (cache && !rsc.ignore(media)) cfg.node.cachemedia = media;

                                            return cache;
                                        };

                                        if (name == 'zoom') {

                                            if (/^false$/i.test(item)) return false;
                                            cfg.node.clickevent = atrArray.length > 1 ? atrArray[1] : /^true$/i.test(item) ? null : item;

                                            return rsc.ignore(cfg.node.clickevent) ? rsc.getBoolean(item) : true;
                                        };

                                    }

                                    const property = {

                                        track   : !rsc.getBoolean(factor),
                                        fade    : !rsc.getBoolean(factor),
                                        trace   : rsc.getBoolean(factor),
                                        loading : factor || 'auto',
                                        name    : factor || csvRoot.id,
                                        delay   : Number.isInteger(parseInt(factor, 10)) ? parseInt(factor, 10) : 250
                                    };

                                    if (property.hasOwnProperty(name)) return property[name];
                                    if (!factor) return !!evaluate;

                                    const reA      = name == 'sur' ? /.surtitle[^&]*?}/i : /.subtitle[^&]*?}/i;
                                    const reB      = /(\s+)?:(\s+)?/g; // whitespace surrounding a colon
                                    const ar       = factor.replace(reB,':').split(',');
                                    const atrArray = ar.map(item => item.trim());
                                    const item     = atrArray[0];

                                    if (evaluate) return evalAttribute();

                                    if (!Number.isInteger(parseInt(item))) {

                                        if (!rsc.getBoolean(item)) return false;
                                        if (atrArray.length > 1) atrArray.shift();
                                    };

                                    if (name == 'auto') {

                                        cfg.node.autocycle  = Number.isInteger(parseInt(atrArray[0])) ? parseInt(atrArray[0]) : 10;
                                        cfg.node.autopause  = Number.isInteger(parseInt(atrArray[1])) ? parseInt(atrArray[1]) : 3000;
                                        cfg.node.autocancel = cfg.node.autocycle > -1;

                                        cfg.node.fade  = cfg.node.autopause > 400;
                                        cfg.node.track = 'false'; // typeof string property

                                        return true;
                                    };

                                    const getStyle = () => {

                                        if (atrArray.length == 0) return;

                                        const setStyleAttribute = attribute => {

                                            const regex = Boolean(attribute.match(/color:/i)) ? /color[^&]*?;/i
                                                : Boolean(attribute.match(/font:/i)) ? /font[^&]*?;/i
                                                : Boolean(attribute.match(/padding:/i)) ? /padding[^&]*?;/i
                                                : Boolean(attribute.match(/top:/i)) ? /top[^&]*?;/i
                                                : Boolean(attribute.match(/bottom:/i)) ? /bottom[^&]*?;/i
                                                : null;

                                            if (!rsc.ignore(regex)) {

                                                const group = String(cfg.shadowStyle.match(reA));

                                                if (group) {

                                                    const newGroup = group.replace(regex, attribute.replace(reB,':') + ';');
                                                    if (newGroup) cfg.shadowStyle = cfg.shadowStyle.replace(group, newGroup);
                                                };

                                            };

                                        }

                                        atrArray.forEach(attribute => { if (styleAttributes.includes(attribute.split(':')[0])) setStyleAttribute(attribute); });
                                    }

                                    if (styleProperties.includes(name)) getStyle();

                                    return true;
                                }

                                cfg.node.track   = getProperty('track'); // enabled
                                cfg.node.fade    = getProperty('fade'); // enabled
                                cfg.node.cache   = getProperty('cache'); // enabled
                                cfg.node.trace   = getProperty('trace'); // disabled
                                cfg.node.loading = getProperty('loading'); // enabled (default auto)
                                cfg.node.name    = getProperty('name'); // local media list template nodeName
                                cfg.node.zoom    = getProperty('zoom'); // enabled
                                cfg.node.delay   = getProperty('delay'); // default 250
                                cfg.node.sur     = getProperty('sur'); // disabled
                                cfg.node.sub     = getProperty('sub'); // disabled
                                cfg.node.auto    = getProperty('auto'); // disabled

                                Object.freeze(cfg.node);

                                cfg.template = getTemplate(); // local media list element

                                return true;
                            }

                            return getCSVRootProperties();
                        },

                        textList: () => cfg.srcRoot || cfg.template,

                        textArray: () => {

                            cfg.mediaArray = null;

                            rsc.inspect({ type: rsc.notify, notification: remark.element + ' [' + rsc.getProperties(cfg.node) + ']', logtrace: cfg.node.trace });

                            const regex = /\s*\n\s*/g; // match whitespace surrounding linefeed

                            const getMediaList = () => {

                                const shadowList = () => csvRoot.textContent.replace(regex,'\n') || null;

                                const lightList = () => {

                                    const text = rsc.elementName(cfg.template) != 'template' ? cfg.template.textContent : cfg.template.content.textContent;
                                    if (rsc.ignore(text)) return rsc.inspect({ type: rsc.error, notification: remark.template + ' [' + cfg.node.name + ']' });

                                    return this.parseText(text).replace(regex,'\n');
                                }

                                return cfg.srcRoot ? shadowList() : lightList();
                            }

                            const isMediaArray = () => {

                                const mediaList = getMediaList();

                                if (rsc.ignore(mediaList)) return false;

                                const parseList = () => remark.markup + ' [' + csvRoot.id + (cfg.srcRoot ? ' - file name: ' + rsc.fileName(cfg.src)
                                    : ' - node name: ' + cfg.node.name) + ']' + rsc.newline + mediaList
                                        .replaceAll(rsc.commaSymbol, '&comma;')
                                        .replace(/&lt;/g, '<')
                                        .replace(/&gt;/g, '>');

                                rsc.inspect({ type: rsc.notify, notification: parseList(), logtrace: cfg.node.trace });
                                cfg.mediaArray = mediaList ? mediaList.trim().split('\n') : null;

                                return !rsc.ignore(cfg.mediaArray);
                            }

                            return isMediaArray();
                        }

                    };

                    this.get = { // the custom HTMLElement extension

                        shadow: () => {

                            const getSwipe = swipe => {

                                const offset = swipe.action ? swipe.right : swipe.left;
                                cfg.slide = cfg.slide += offset;

                                this.get.slide({ shadow: cfg.shadow });
                            }

                            const shade = document.querySelector('#' + csvRoot.id);
                            rsc.clearElement(shade);

                            shade.attachShadow({ mode: 'open' });
                            cfg.shadow = shade.shadowRoot;

                            this.compose.style();
                            this.compose.body();

                            if (!cfg.node.auto) rsc.setSwipe({ node: cfg.shadow.querySelector('div.slideview-body > div.slideview-media') }, getSwipe, { left: -1, right: 1 });
                        },

                        slide: obj => {

                            const getShadow = node => { // shadowRoot slide manager

                                const root   = node.getRootNode().host;
                                const shade  = document.querySelector('#' + root.id);
                                const shadow = shade.shadowRoot;
                                const active = shadow.querySelector('div.slideview-media > div.active');

                                cfg.slide = Number.parseInt(active.id.replace('svm', ''), 10);

                                srm.set('left', cfg.slide - 1);
                                srm.set('right', cfg.slide + 1);
                                srm.set('stud', Number.parseInt(node.id.replace('svt', ''), 10));

                                cfg.slide = srm.get(node.className);

                                return shadow;
                            }

                            if (rsc.ignore(obj.shadow)) obj.shadow = rsc.ignore(obj.node) ? cfg.shadow : getShadow(obj.node);

                            const media   = obj.shadow.querySelectorAll('div.slideview-media > div.slide');
                            const track   = obj.shadow.querySelectorAll('div.slideview-track > span.stud');
                            const active  = obj.shadow.querySelector('div.slideview-media > div.active');
                            const enabled = obj.shadow.querySelector('div.slideview-track > span.enabled');

                            cfg.slide = !rsc.ignore(obj.autoslide) ? obj.autoslide
                                : cfg.slide < 1 ? media.length
                                : cfg.slide > media.length ? 1
                                : cfg.slide;

                            const next = cfg.slide-1;

                            if (rsc.ignore(media[next])) return;

                            if (active) active.classList.replace('active', 'none');
                            if (enabled) enabled.className = 'stud';

                            media[next].classList.replace('none', 'active');
                            track[next].className = 'stud enabled';
                        },

                        view: () => {

                            const getAuto = () => {

                                const media = cfg.shadow.querySelectorAll('div.slideview-media > div.slide');
                                const complete = cfg.node.autocancel && cfg.node.autocycle > -1 ? cfg.mediaArray.length * cfg.node.autocycle : 0;

                                let iteration = 0;
                                let autoslide = 1;

                                const autoCancel = () => {

                                    autoslide = autoslide < 1 ? media.length
                                        : autoslide > media.length ? 1
                                        : autoslide;

                                    if (!cfg.node.autocancel) return (autoslide++, false); // never stops
                                    return iteration === complete || (autoslide++, iteration++, false); // stops when complete
                                }

                                const auto = setInterval(() => {

                                    if (autoCancel()) clearInterval(auto);
                                    atr.get.slide({ autoslide: autoslide-1 });

                                }, cfg.node.autopause);

                            }

                            const insertCache = () => { // cache a range of response.status values (200, 304 etc)

                                if (!globalThis.hasOwnProperty('caches')) return;

                                const src   = cfg.srcRoot ? cfg.src.split() : Array.from('');
                                const name  = csv + '-cache';
                                const media = [];

                                if (cfg.node.cachemedia) {

                                    cfg.mediaArray.forEach(item => {

                                        let ar = item.split(',');
                                        if (!rsc.ignore(ar[0])) media.push(ar[0].trim());

                                    });

                                };

                                const urlArray = rsc.removeDuplcates(media.concat(src.concat(cfg.cssRoot.concat([ import.meta.url ]))));

                                urlArray.forEach(url => {

                                    fetch(url).then(response => {

                                        if (!response.ok) { rsc.inspect({ type: rsc.warn, notification: remark.cache + ' [' + response.status + '] - ' + url, logtrace: cfg.node.trace }); };
                                        return caches.open(name).then(cache => { return cache.put(url, response); });

                                    });

                                });

                            }

                            setTimeout(() => {

                                if (cfg.node.auto) setTimeout(() => { getAuto(); }, cfg.node.delay);
                                atr.setDisplay.show();

                            }, cfg.node.delay);

                            if (cfg.node.cache) insertCache();

                            rsc.inspect({ type: rsc.notify, notification: cfg.shadow, logtrace: cfg.node.trace });
                        }

                    };

                    this.compose = { // compose the custom HTMLElement extension

                        style: () => {

                            const styleNode = document.createElement('style');
                            styleNode.className = 'slideview-style';
                            styleNode.insertAdjacentHTML('beforeend', cfg.shadowStyle);

                            cfg.shadow.appendChild(styleNode);
                        },

                        body: () => {

                            const setURL      = () => rsc.ignore(obj.ar[0]) ? null : obj.ar[0].trim();
                            const videoMedia  = () => rsc.ignore(obj.ar[0]) ? false : rsc.isVideo(obj.ar[0]);
                            const getSubtitle = () => rsc.ignore(obj.ar[1]) ? null : obj.ar[1].trim().replaceAll(rsc.commaSymbol, ',');
                            const getSurtitle = () => rsc.ignore(obj.ar[2]) ? obj.index + ' / ' + cfg.mediaArray.length : obj.ar[2].trim().replaceAll(rsc.commaSymbol, ',');
                            const setSubtitle = () => cfg.node.sub ? getSubtitle() : null;
                            const setSurtitle = () => cfg.node.sur ? getSurtitle() : null;
                            const setLoading  = () => Boolean(cfg.node.loading.match(/lazy|eager|auto/i)) ? cfg.node.loading : 'auto';

                            const setImageEvent = cfg.node.zoom ? rsc.ignore(cfg.node.clickevent) ? 'ceres.getImage(this)' : cfg.node.clickevent : null;
                            const setSlideEvent = 'ceres.getSlide(this)';
                            const setSlideClass = this.getClass('slide');

                            const bodyNode = document.createElement('div');
                            bodyNode.className = 'slideview-body';

                            const mediaNode = document.createElement('div');
                            mediaNode.className = 'slideview-media';

                            bodyNode.appendChild(mediaNode);

                            const trackNode = document.createElement('div');
                            trackNode.className = this.getClass('slideview-track');

                            bodyNode.appendChild(trackNode);

                            const obj = { index: 0, ar: [] };

                            cfg.mediaArray.forEach(item => {

                                obj.ar = item.split(',');

                                const slideNode = document.createElement('div');
                                slideNode.className = setSlideClass;
                                slideNode.id = 'svm' + ++obj.index;

                                mediaNode.appendChild(slideNode);

                                if (cfg.node.sur) rsc.composeElement({ nodeType: 'div', parent: slideNode, markup: setSurtitle() }, { class: 'surtitle fade' });

                                if (videoMedia()) {

                                    slideNode.classList.remove('zoom');
                                    rsc.composeElement({ nodeType: 'video', parent: slideNode, src: setURL(), type: rsc.mediaType(obj.ar[0]) }, { width: '100%', autoplay: true });

                                } else {

                                    rsc.composeElement({ nodeType: 'img', parent: slideNode }, { class: 'slide', onclick: setImageEvent, src: setURL(), alt: getSubtitle(), loading: setLoading() });
                                }

                                if (cfg.node.sub) rsc.composeElement({ nodeType: 'div', parent: slideNode, markup: setSubtitle() }, { class: 'subtitle fade' });

                            });

                            if (cfg.mediaArray.length > 1) {

                                 rsc.composeElement({ nodeType: 'a', parent: mediaNode }, { class: this.getClass('left'), onclick: setSlideEvent });
                                 rsc.composeElement({ nodeType: 'a', parent: mediaNode }, { class: this.getClass('right'), onclick: setSlideEvent });
                            }

                            cfg.mediaArray.forEach((item, i) => { rsc.composeElement({ nodeType: 'span', parent: trackNode }, { class: 'stud', id: 'svt' + ++i, onclick: setSlideEvent }); });

                            cfg.shadow.appendChild(bodyNode);
                        }

                    };

                    this.setDisplay = {

                        hide: () => {

                            csvRoot.style.visibility = 'hidden';
                            csvRoot.style.display = 'none';
                        },

                        show: () => {

                            csvRoot.style.removeProperty('display');
                            csvRoot.style.removeProperty('visibility');

                            if (csvRoot.style.length === 0) csvRoot.removeAttribute('style');
                        }

                    };

                    this.getClass = className => {

                        if (className != 'slide') return cfg.node.track && (cfg.node.auto || cfg.mediaArray.length < 2) ? className += ' none' : className;

                        if (cfg.node.zoom) className += ' zoom';
                        if (cfg.node.fade) className += ' fade';

                        return className += ' none';

                    };

                    this.parseFile = text => {

                        const str = rsc.fileType(cfg.src, 'json') ? this.parseJSON(text)
                            : rsc.fileType(cfg.src, 'csv') ? this.parseJSON( rsc.parseCSV( text, { json: true, nodes: ['url','sub','sur'], commaCodes: rsc.commaCodes, commaSymbol: rsc.commaSymbol } ))
                            : text;

                        return this.parseText(str);
                    }

                    this.parseText = text => rsc.softSanitize(text
                        .replace(/\\,|&comma;|&#x2c;|&#44;|U+0002C/g, rsc.commaSymbol)
                        .replace(/^\s*?<template(.*?)>|<\/template>\s*?$/, ''))
                        .trim();

                    this.parseJSON = text => {

                        const json = JSON.parse(text);
                        let str = '';

                        json.forEach(node => {

                            str += node.url
                                + (node.sub ? ', ' + node.sub.replace(rsc.commaCodes, rsc.commaSymbol) : '')
                                + (node.sur ? ', ' + node.sur.replace(rsc.commaCodes, rsc.commaSymbol) : '')
                                + '\n';
                        });

                        return str;
                    }

                    Object.seal(atr);

                }).call(atr); // end of attribute allocation

            }

        }

    }); // end of the custom HTMLElement extension

})();
