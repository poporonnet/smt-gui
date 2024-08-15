const GPIO = 'GPIO'

const Kanirobo2Converter = {
    register: function (converter) {
        converter.registerCallMethod('self', GPIO, 0, params => {
            const { node } = params;

            return converter.createRubyExpressionBlock(GPIO, node);
        });
        converter.registerCallMethod('self', 'motor32', 0, params => {
            const { node } = params;

            return converter.createRubyExpressionBlock('motor32', node);
        });
        converter.registerCallMethod('self', 'motor25', 0, params => {
            const { node } = params;

            return converter.createRubyExpressionBlock('motor25', node);
        });

        converter.registerCallMethod('motor32', 'write', 1, params => {
            const { receiver, args } = params;
            if (!converter.isNumberOrBlock(args[0].value) && (args[0].value == 0 || args[0].value == 1)) return null;
            const block = converter.changeRubyExpressionBlock(receiver, 'kanirobo2_command4', 'statement');
            converter.addField(block, 'TEXT1', '32');
            converter.addFieldInput(block, 'TEXT2', 'kanirobo2_menu_menu1', 'menu1', args[0], '0');
            return block;
        });

        converter.registerCallMethod('motor25', 'write', 1, params => {
            const { receiver, args } = params;
            if (!converter.isNumberOrBlock(args[0].value) && (args[0].value == 0 || args[0].value == 1)) return null;
            const block = converter.changeRubyExpressionBlock(receiver, 'kanirobo2_command4', 'statement');
            converter.addField(block, 'TEXT1', '25');
            converter.addFieldInput(block, 'TEXT2', 'kanirobo2_menu_menu1', 'menu1', args[0], '0');
            return block;
        });

        converter.registerCallMethod('self', 'motor32 = ', 1, params => {
            const { receiver, args } = params;
            console.error(args);
            const block = converter.changeRubyExpressionBlock(receiver, 'kanirobo2_command4', 'statement');
            converter.addField(block, 'TEXT1', '25');
            converter.addFieldInput(block, 'TEXT2', 'kanirobo2_menu_menu1', 'menu1', args[0], '0');
            return block;
        });

    }
};

export default Kanirobo2Converter;