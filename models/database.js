'use strict';

import { connect } from 'mongoose';

const connectDb = () => {
    return connect(`mongodb://localhost/api`, { useNewUrlParser: true} );
}

export default {connectDb};
