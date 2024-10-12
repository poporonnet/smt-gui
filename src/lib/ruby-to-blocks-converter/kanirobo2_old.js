import _ from 'lodash';

const GPIO = '::GPIO'

const Kanirobo2Converter = {

    register: function (converter) {
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
    },

    onVasgn: function (scope, variable, rh) {
        let block;
        let pat;
        console.error(rh.node.children);
        switch (variable.name) {
            case `motor32`:
                if (
                    rh.node.children[0].children[1] === "GPIO" &&
                    rh.node.children[1] === "new" &&
                    rh.node.children[2].children[0] === 32 &&
                    rh.node.children[3].children[1] === "OUT"
                ) {
                    console.error("motor")
                    block = this._createBlock('kanirobo2_command2', 'statement');
                    this._addFieldInput(block, 'TEXT', 'kanirobo2_menu_menu2', 'menu2', 32, '0');
                    console.error(block);
                }
                break;
            /*
        case `motor25`:
            pat = /motor25\s*=\s*GPIO.new\(\s*25,\s*GPIO::OUT\s*\)/
            //if (pat.test(code)) {
            console.error("test");
            // ブロック生成
            block = this._createBlock('kanirobo2_command4', 'statement', {
                fields: {
                    name: 'TEXT',
                    id: variable.id,
                    value: 25,
                    variableType: '',
                }
            });
            //}
            break;
            */
            case 'motor25':
                if (rh) {
                    this.register();
                }
                break;
        }
        return block;
    },


    /*
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock, node) {
        let block;
        if (this._isSelf(receiver) || receiver === Opal.nil) {
            console.error("motor")
            switch (name) {
                case 'motor32=':
                    if (args.length === 0) {
                        block = this._createRubyExpressionBlock('motor32=', node);
                    }
                    break;
                case 'test':
                    console.error("test")
            }
        }

        switch (name) {

            case 'new':
                if (this._isNumber(args[0])) {
                    console.error("GPIO")
                    block = this._changeBlock(receiver, 'kanirobo2_command2', 'statement');
                    delete this._context.blocks[receiver.inputs.EXPRESSION.block];
                    delete receiver.inputs.EXPRESSION;

                    this._addFieldInput(block, 'TEXT', 'kanirobo2_menu_menu2', 'menu2', 32, '0');
                }
                break;
            case 'new': // この case 文で生成したいブロックに対応する Rubyのオブジェクトか判定
                if (receiver.toString() === '::GPIO') {// オブジェクトに対応するメソッドか判定
                    // ブロック生成
                    block = this._createBlock('kanirobo2_command2', 'statement');
                    this._addFieldInput(block, 'TEXT', 'kanirobo2_menu_menu2', 'menu2', 32, '0');
                }
                break;
        }
        return block;
    },*/

};
export default Kanirobo2Converter;