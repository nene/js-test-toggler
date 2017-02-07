'use babel';
import pathlib from "path";

const TEST_PATH = "/Users/nene/work/xr-agent/xr-web-ui/tests/unit/";
const CODE_PATH = "/Users/nene/work/xr-agent/xr-web-ui/src/xr/";
const TEST_RE = new RegExp(`^${escapeRegExp(TEST_PATH)}(.*)Test\\.js$`);
const CODE_RE = new RegExp(`^${escapeRegExp(CODE_PATH)}(.*)\\.js$`);

function escapeRegExp(str) {
	return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
};

function createTestCode(relPath) {
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

function openTestFile(path) {
    const [, relPath] = path.match(CODE_RE) || [];

    if (relPath) {
        // open corresponding test file
        atom.workspace.open(TEST_PATH + relPath + "Test.js")
            .then((editor) => {
                if (editor.isEmpty()) {
                    editor.setText(createTestCode(relPath))
                }
            });
        return true;
    }
}

function openCodeFile(path) {
    [, relPath] = path.match(TEST_RE) || [];

    if (relPath) {
        // open corresponding code file
        atom.workspace.open(CODE_PATH + relPath + ".js");
        return true;
    }
}

export default function toggleTest() {
    const path = atom.workspace.getActiveTextEditor().getPath();
    openTestFile(path) || openCodeFile(path);
}
