const Tools = 'tools'
const Puts = 'puts='
const ToolsConverter = {
    register: function (converter) {
        converter.registerCallMethod('self', Tools, 0, params => {
            const { node } = params;

            return converter.createRubyExpressionBlock(Tools, node);
        });
        converter.registerCallMethod('self', Puts, 1, params => {
            const { receiver, args } = params;
            if (!converter.isStringOrBlock(args[0].value)) return null;
            console.error("tools")

            const block = converter.changeRubyExpressionBlock(receiver, 'tools_puts', 'statement');
            converter.addTextInput(block, 'TEXT', args[0].value, 'test');
            return block;
        });
        converter.registerCallMethod('self', 'puts', 1, params => {
            console.error("puts")
            const { receiver, args } = params;
            if (!converter.isStringOrBlock(args[0].value)) return null;
            console.error(args[0].value)

            const block = converter.createBlock('tools_puts', 'statement');
            converter.addTextInput(block, 'TEXT', args[0].value, 'test');
            return block;
        });
    }
};
export default ToolsConverter;