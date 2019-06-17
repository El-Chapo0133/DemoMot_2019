

class js_math_custom {
    /**
     * Methode add
     * @param {int} nb1 -> number 1
     * @param {int} nb2 -> number 2
     */
    static Sum(nb1, nb2) {
        return nb1 + nb2
    }
    static diff(nb1, nb2) {
        return nb1 - nb2
    }
    static multiply(nb1, nb2) {
        return nb1 * nb2
    }
    static divide(nb1, nb2) {
        return nb1 / nb2
    }
    static pow(nb, pow) {
        if (pow === 0) {
            return 1
        } else if (pow >= 1) {
            var result = 1
            for (var i = 0; i < pow; i++) {
                result *= nb
            }
            return result
        } else if (pow <= -1) {
            var result_v1 = 1
            for (var i = 0; i < pow; i++) {
                result_v1 *= nb
            }
            return 1 / result_v1
        }
    }
    static root(nb, pow) {
        
    }
}