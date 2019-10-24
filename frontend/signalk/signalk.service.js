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

'use strict';
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

/**
 * @ngdoc service
 * @name hfosFrontendApp.signalk
 * @description
 * # signalkservice
 * Service in the hfosFrontendApp.
 */

class signalk {

    constructor(user, notification, interval, timeout, socket, rootscope) {
        this.user = user;
        this.notification = notification;
        this.interval = interval;
        this.timeout = timeout;
        this.socket = socket;
        this.rootscope = rootscope;

        console.log('[SIGNALK] Service loaded');
    }

    hello() {
        console.log('[SIGNALK] Running:', this);
    }
}

signalk.$inject = ['user', 'notification', '$interval', '$timeout', 'socket', '$rootScope'];

export default signalk;
