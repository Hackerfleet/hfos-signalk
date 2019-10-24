/*
 * HFOS - Hackerfleet Operating System
 * ===================================
 * Copyright (C) 2011-2019 Heiko 'riot' Weinen <riot@c-base.org> and others.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import angular from 'angular';
import uirouter from 'angular-ui-router';

import {routing} from './signalk.config.js';

import './signalk/signalk.scss';

import signalkservice from './signalk/signalk.service.js';

import signalktemplate from './signalk/signalk.tpl.html';
import signalk from './signalk/signalk';

export default angular
    .module('main.app.signalk', [uirouter])
    .config(routing)
    .service('signalkservice', signalkservice)
    .component('signalk', {template: signalktemplate, controller: signalk})
    .run(function (signalkservice) {
        signalkservice.hello()
    })
    .name;
