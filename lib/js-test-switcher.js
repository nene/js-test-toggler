'use babel';
import {CompositeDisposable} from 'atom';
import TestToggler from './TestToggler';
import config from './config';

export default {
    config,

    activate(state) {
        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'js-test-switcher:toggle': () => new TestToggler().toggle()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },
};
