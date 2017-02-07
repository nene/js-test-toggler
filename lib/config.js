'use babel';

export default {
    codePath: {
        type: "string",
        default: "/Users/nene/work/xr-agent/xr-web-ui/src/xr/",
    },
    testPath: {
        type: "string",
        default: "/Users/nene/work/xr-agent/xr-web-ui/tests/unit/",
    },
    testTemplate: {
        type: "string",
        description: "Available placeholders: `<dir>`, `<className>`, `<instanceName>`.",
        default:
`import <className> from "<dir>";

describe("<className>", function() {
    beforeEach(function() {
        this.<instanceName> = new <className>();
    });

    it("exists", function() {
        expect(this.<instanceName>).toBeDefined();
    });
});
`
    },
};
