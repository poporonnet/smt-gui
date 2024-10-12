const Tools = 'tools'
const Puts = 'puts'
const ToolsConverter = {
    register: function (converter) {
        console.error(converter)
        /*
        converter.registerCallMethod('self', Tools, 0, params => {
            const { node } = params;

            return converter.createRubyExpressionBlock(Tools, node);
        });
        converter.registerCallMethod('self', Puts, 0, params => {
            const { receiver, node } = params;
            console.error("puts")

            const block = converter.changeRubyExpressionBlock(receiver, 'ruby_expression', 'statement');
            block.node = node;
            converter.addInput(block, 'EXPRESSION', converter.createTextBlock('puts'));
            return block;
        });
        */

        //正しい
        converter.registerCallMethod('self', 'puts', 1, params => {
            console.error(params)
            const { args } = params;
            if (!converter.isStringOrBlock(args[0])) return null;

            const block = converter.createBlock('tools_puts', 'statement');
            converter.addTextInput(block, 'TEXT', args[0], 'test');
            return block;
        });

        //正しい
        converter.registerCallMethod('self', Tools, 0, params => {
            const { node } = params;

            return converter.createRubyExpressionBlock(Tools, node);
        });

        converter.registerCallMethod(Tools, 'puts', 1, params => {
            const { receiver, args } = params;
            if (!converter.isStringOrBlock(args[0])) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'tools_puts', 'statement');
            converter.addTextInput(block, 'TEXT', args[0], 'test');
            return block;
        });
    }
};
export default ToolsConverter;