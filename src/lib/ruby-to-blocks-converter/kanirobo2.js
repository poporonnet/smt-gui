const GPIO = '::GPIO'

const Kanirobo2Converter = {
    register: function (converter) {
        /*
        * motor32 = GPIO.new(32, GPIO::OUT) #ダメ
        */
        converter.registerCallMethod('self', 'motor32', 0, params => {
            const { node } = params;

            return converter.createRubyExpressionBlock('motor32', node);
        });

        converter.registerCallMethod('motor32', 'write', 1, params => {
            const { receiver, args } = params;
            if (!converter.isNumberOrBlock(args[0].value) && (args[0].value == 0 || args[0].value == 1)) return null;
            const block = converter.changeRubyExpressionBlock(receiver, 'kanirobo2_command4', 'statement');
            converter.addField(block, 'TEXT1', '32');
            converter.addFieldInput(block, 'TEXT2', 'kanirobo2_menu_menu1', 'menu1', args[0], '0');
            return block;
        });

        //test
        converter.registerCallMethod('self', 'motor32=', 0, params => {
            const { receiver, node } = params;

            const block = converter.changeRubyExpressionBlock(receiver, 'ruby_expression', 'statement');
            block.node = node;
            converter.addInput(block, 'EXPRESSION', converter.createTextBlock('motor32='));
            return block;
        });

        //GPIO.new(32, GPIO::OUT)
        converter.registerCallMethod('self', GPIO, 0, params => {
            const { node } = params;
            console.error("test")
            return converter.createRubyExpressionBlock(GPIO, node);
        });

        converter.registerCallMethod(GPIO, 'new', 2, params => {
            const { receiver, args } = params;
            //if (!converter.isNumberOrBlock(args[0].value) && (args[0].value == 0 || args[0].value == 1)) return null;
            console.error(args[0].value)
            const block = converter.changeRubyExpressionBlock(receiver, 'kanirobo2_command2', 'statement');
            //converter.addField(block, 'TEXT', "32");
            converter.addFieldInput(block, 'TEXT', 'kanirobo2_menu_menu2', 'menu2', args[0], '0');
            return block;
        });

        /*
        * motor25 = GPIO.new(25, GPIO::OUT) #ダメ
        */
        converter.registerCallMethod('self', 'motor25', 0, params => {
            const { node } = params;

            return converter.createRubyExpressionBlock('motor25', node);
        });

        converter.registerCallMethod('motor25', 'write', 1, params => {
            const { receiver, args } = params;
            if (!converter.isNumberOrBlock(args[0].value) && (args[0].value == 0 || args[0].value == 1)) return null;
            const block = converter.changeRubyExpressionBlock(receiver, 'kanirobo2_command4', 'statement');
            converter.addField(block, 'TEXT1', '25');
            converter.addFieldInput(block, 'TEXT2', 'kanirobo2_menu_menu1', 'menu1', args[0], '0');
            return block;
        });

        //test
        converter.registerCallMethod('motor32=', ' GPIO.new', 2, params => {
            const { receiver, args } = params;
            console.error(args);
            const block = converter.changeRubyExpressionBlock(receiver, 'kanirobo2_command4', 'statement');
            converter.addField(block, 'TEXT1', '32');
            converter.addFieldInput(block, 'TEXT2', 'kanirobo2_menu_menu1', 'menu1', args[0], '0');
            return block;
        });

    }
};

export default Kanirobo2Converter;