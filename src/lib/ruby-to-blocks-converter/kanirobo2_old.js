import _ from 'lodash';
const matchField = (field) => {
    // Ruby コードに対してパターンマッチを行う
}
const Kanirobo2Converter = {

    onVasgn: function (scope, variable, rh) {
        let block;
        let pat;
        console.error(rh);
        console.error(scope);
        switch (variable.name) {
            case `motor32`:
                pat = /motor32\s*=\s*GPIO.new\(\s*32,\s*GPIO::OUT\s*\)/
                if (pat.test(node)) {
                    // ブロック生成
                    block = this._createBlock('kanirobo2_command4', 'statement', {
                        fields: {
                            name: 'TEXT',
                            id: variable.id,
                            value: 32,
                            variableType: '',
                        }
                    });
                }
                break;
            case `motor25`:
                pat = /motor25\s*=\s*GPIO.new\(\s*25,\s*GPIO::OUT\s*\)/
                if (pat.test(code)) {
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
                }
                break;
        }
        return block;
    },

    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock, node) {
        let block;
        console.error(node)
        /*
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
        */

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
            /*
            case 'new': // この case 文で生成したいブロックに対応する Rubyのオブジェクトか判定
                if (receiver.toString() === '::GPIO') {// オブジェクトに対応するメソッドか判定
                    // ブロック生成
                    block = this._createBlock('kanirobo2_command2', 'statement');
                    this._addFieldInput(block, 'TEXT', 'kanirobo2_menu_menu2', 'menu2', 32, '0');
                }
                break;
                 */
        }
        return block;
    },
};
export default Kanirobo2Converter;