#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# HFOS - Hackerfleet Operating System
# ===================================
# Copyright (C) 2011-2019 Heiko 'riot' Weinen <riot@c-base.org> and others.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

__author__ = "Heiko 'riot' Weinen"
__license__ = "AGPLv3"

"""

Module: SignalkManager
======================

Manages a connected Signal K node


"""

from collections import deque
from circuits import Event
from circuits.net.events import write
from circuits.web.websockets.client import WebSocketClient
from json import dumps, loads

from isomer.component import ConfigurableComponent, handler, authorized_event
from isomer.logger import error, warn, verbose, critical, events
from isomer.debugger import cli_register_event
from isomer.events.client import broadcast, send


class cli_show_status(Event):
    """Display current signalk status"""
    pass


class SignalKManager(ConfigurableComponent):
    """
    Signal K protocol adaptor
    """

    configprops = {
        'hostname': {'type': 'string', 'default': 'localhost'},
        'port': {'type': 'integer', 'default': 3000},
        'username': {'type': 'string'},
        'password': {'type': 'string'},
        'use_auth': {'type': 'boolean', 'default': False},
        'protocol': {'type': 'string', 'enum': ['ws', 'wss'], 'default': 'ws'},
        'protocol_version': {'type': 'string', 'enum': ['v1', 'v3'], 'default': 'v1'}
    }

    channel = 'isomer-web'

    def __init__(self, *args):
        super(SignalKManager, self).__init__("SIGNALK", *args)

        self.url = self.config.protocol + '://' + self.config.hostname + ':' + \
                   str(self.config.port) + '/signalk/' + self.config.protocol_version + '/stream'

        self.signalk_socket = WebSocketClient(self.url).register(self)

        self.messages = deque(maxlen=2000)

        self.fireEvent(cli_register_event('signalk_status', cli_show_status))

        self.log("Started")

    @handler('cli_show_status')
    def show_status(self, event):
        self.log("URL:", self.url)
        self.log("Websocket:", self.signalk_socket, pretty=True)

    @handler("registered", channel='ws')
    def connected(self, event, *args):
        if 'ws' not in event.channels:
            return

        if self.config.use_auth is True:
            self.log('Transmitting login')

            packet = {
                'component': 'auth',
                'action': 'login',
                'data': {
                    'username': self.config.username,
                    'password': self.config.password
                }
            }

            self.fireEvent(write(dumps(packet)), 'ws')

    @handler("read", channel='ws')
    def read(self, *args):
        msg = args[0]
        self.messages.append(msg)
        self.log("Response [%i]: %s" % (len(self.messages), msg))

