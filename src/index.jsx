import React from 'react';
import * as TVDML from 'tvdml';

import store from './redux/store';
import { launchApp, resumeApp, suspendApp } from './redux/ducks/app';

import RuntimeWrapper from './components/RuntimeWrapper';

import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';

TVDML.subscribe(TVDML.event.LAUNCH).pipe(
  TVDML.render(() => (
    <document>
      <menuBarTemplate>
        <menuBar>
          <menuItem route="page1">
            <title>Page1</title>
          </menuItem>
          <menuItem route="page2" autoHighlight>
            <title>Page2</title>
          </menuItem>
          <menuItem route="page3">
            <title>Page3</title>
          </menuItem>
          <menuItem route="page4">
            <title>Page4</title>
          </menuItem>
        </menuBar>
      </menuBarTemplate>
    </document>
  )),
);

TVDML.subscribe(TVDML.event.LAUNCH).pipe(payload =>
  store.dispatch(launchApp(payload)),
);

TVDML.subscribe(TVDML.event.SUSPEND).pipe(() => store.dispatch(suspendApp()));

TVDML.subscribe(TVDML.event.RESUME).pipe(() => store.dispatch(resumeApp()));

TVDML.handleRoute('page1').pipe(
  TVDML.render(() => (
    <RuntimeWrapper>
      <Screen1 name="Developer" />
    </RuntimeWrapper>
  )),
);

TVDML.handleRoute('page2').pipe(
  TVDML.render(() => (
    <RuntimeWrapper>
      <Screen2 />
    </RuntimeWrapper>
  )),
);

TVDML.handleRoute('page3').pipe(
  TVDML.render(() => (
    <RuntimeWrapper>
      <Screen3 />
    </RuntimeWrapper>
  )),
);

TVDML.handleRoute('page4').pipe(TVDML.render(() => <Screen4 />));
