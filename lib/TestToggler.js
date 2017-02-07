'use babel';
import pathlib from "path";

export default class TestToggler {
    /**
     * Toggles between test and code files.
     */
    toggle() {
        const path = atom.workspace.getActiveTextEditor().getPath();
        this.openTestFile(path) || this.openCodeFile(path);
    }

    openTestFile(path) {
        const [, relPath] = path.match(this.codePathRegex()) || [];

        if (relPath) {
            // open corresponding test file
            atom.workspace.open(this.testPath() + relPath + "Test.js")
                .then((editor) => {
                    if (editor.isEmpty()) {
                        editor.setText(this.createTestCode(relPath))
                    }
                });
            return true;
        }
    }

    openCodeFile(path) {
        [, relPath] = path.match(this.testPathRegex()) || [];

        if (relPath) {
            // open corresponding code file
            atom.workspace.open(this.codePath() + relPath + ".js");
            return true;
        }
    }

    createTestCode(relPath) {
        const dir = "xr/" + relPath;
        const className = pathlib.basename(relPath);
        const instanceName = className.replace(/^./, (chr) => chr.toLowerCase());

        return `import ${className} from "${dir}";

describe("${className}", function() {
    beforeEach(function() {
        this.${instanceName} = new ${className}();
    });

    it("exists", function() {
        expect(this.${instanceName}).toBeDefined();
    });
});
`;
    }

    codePathRegex() {
        return new RegExp(`^${this.escapeRegExp(this.codePath())}(.*)\\.js$`);
    }

    testPathRegex() {
        return new RegExp(`^${this.escapeRegExp(this.testPath())}(.*)Test\\.js$`);
    }

    escapeRegExp(str) {
    	return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
    }

    codePath() {
        return atom.config.get('js-test-switcher.codePath');
    }

    testPath() {
        return atom.config.get('js-test-switcher.testPath');
    }
}
