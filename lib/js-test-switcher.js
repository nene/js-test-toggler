'use babel';
import {CompositeDisposable} from 'atom';
import toggleTest from './toggleTest';

export default {
    activate(state) {
        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'js-test-switcher:toggle': () => toggleTest()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },
};
