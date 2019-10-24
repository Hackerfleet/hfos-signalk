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



class signalKComponent {

    constructor(scope, objectproxy, $state, $rootScope, socket, user, $timeout) {
        this.scope = scope;
        this.op = objectproxy;
        this.state = $state;
        this.rootscope = $rootScope;
        this.socket = socket;
        this.user = user;
        this.timeout = $timeout;

        let self = this;
    }
}

signalKComponent.$inject = ['$scope', 'objectproxy', '$state', '$rootScope', 'socket', 'user', '$timeout'];

export default signalKComponent;
