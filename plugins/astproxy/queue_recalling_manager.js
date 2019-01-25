/**
 * Provides the support to check if a user is still recalling a number
 * that is an entry into the queue recall table of the call center phone bar service.
 *
 * @class queue_recalling_manager
 * @static
 */

/**
 * The module identifier used by the logger.
 *
 * @property IDLOG
 * @type string
 * @private
 * @final
 * @readOnly
 * @default [queue_recalling_manager]
 */
var IDLOG = '[queue_recalling_manager]';

/**
 * The logger. It must have at least three methods: _info, warn and error._
 *
 * @property logger
 * @type object
 * @private
 * @default console
 */
var logger = console;

/**
 * The asterisk component.
 *
 * @property compAstProxy
 * @type object
 * @private
 */
var compAstProxy;

/**
 * The database component.
 *
 * @property compDbconn
 * @type object
 * @private
 */
var compDbconn;

/**
 * Sets the logger to be used.
 *
 * @method setLogger
 * @param {object} log The logger object. It must have at least
 * three methods: _info, warn and error_ as console object.
 * @static
 */
function setLogger(log) {
  try {
    if (typeof log === 'object' &&
      typeof log.log.info === 'function' &&
      typeof log.log.warn === 'function' &&
      typeof log.log.error === 'function') {

      logger = log;
      logger.log.info(IDLOG, 'new logger has been set');

    } else {
      throw new Error('wrong logger object');
    }
  } catch (err) {
    logger.log.error(IDLOG, err.stack);
  }
}

/**
 * Sets the asterisk proxy component.
 *
 * @method setCompAstProxy
 * @param {object} comp The asterisk proxy component.
 */
function setCompAstProxy(comp) {
  try {
    compAstProxy = comp;
    logger.log.info(IDLOG, 'set asterisk proxy component');
  } catch (err) {
    logger.log.error(IDLOG, err.stack);
  }
}

/**
 * Sets the database architect component.
 *
 * @method setCompDbconn
 * @param {object} comp The database architect component.
 */
function setCompDbconn(comp) {
  try {
    compDbconn = comp;
    logger.log.info(IDLOG, 'set database architect component');
  } catch (err) {
    logger.log.error(IDLOG, err.stack);
  }
}

/**
 * Request the list of the asterisk channels to be analized to understand
 * if the number has already in a conversation.
 *
 * @method checkQueueRecallingStatus
 * @param {string} num The number to be checked for the call
 * @param {function} cb The callback function
 */
function checkQueueRecallingStatus(num, cb) {
  try {
    if (typeof num !== 'string' || typeof cb !== 'function') {
      throw new Error('wrong parameters');
    }
    logger.log.info(IDLOG, 'requests the channel list to be analized to get the recalling status');
    compAstProxy.doCmd({
      command: 'listChannels'
    }, function (err, results) {
      if (err) {
        cb(err);
      } else {
        analizeQueueRecallingStatus(results, num, cb);
      }
    });
  } catch (err) {
    logger.log.error(IDLOG, err.stack);
    return false;
  }
}

/**
 * Analize the channel list to understand if the number has already in a conversation.
 *
 * @method analizeQueueRecallingStatus
 * @param {object} results The channel list
 * @param {string} num The number to be checked for the presence in the list
 * @param {function} cb The callback function
 * @private
 */
function analizeQueueRecallingStatus(results, num, cb) {
  try {
    if (typeof results !== 'object' || typeof num !== 'string' || typeof cb !== 'function') {
      throw new Error('wrong parameters');
    }
    var ch;
    for (ch in results) {
      if (results[ch].callerNum === num || results[ch].bridgedNum === num) {
        cb(null, true);
        return;
      }
    }
    cb(null, false);

  } catch (err) {
    logger.log.error(IDLOG, err.stack);
    cb(err);
  }
}

/**
 * Returns the recall data about the queues.
 *
 * @method getRecallData
 * @param {object} obj
 *   @param {string} obj.hours The amount of hours of the current day to be searched
 *   @param {array} obj.queues The queue identifiers
 *   @param {type} obj.type It can be ("lost"|"done"|"all"). The type of call to be retrieved
 *   @param {integer} obj.offset The results offset
 *   @param {integer} obj.limit The results limit
 * @param {function} cb The callback function
 */
function getRecallData(obj, cb) {
  try {
    if (typeof obj !== 'object' || !obj.queues || !obj.type || !obj.hours) {
      throw new Error('wrong parameters: ' + JSON.stringify(arguments));
    }
    obj.agents = compAstProxy.proxyLogic.getAgentsOfQueues(obj.queues);
    compDbconn.getRecall(obj, cb);
  } catch (error) {
    logger.log.error(IDLOG, error.stack);
    cb(error);
  }
}

/**
 * Returns the details about the queue recall of the caller id.
 *
 * @method getQueueRecallInfo
 * @param {string} hours The amount of hours of the current day to be searched
 * @param {string} cid The caller identifier
 * @param {string} qid The queue identifier
 * @param {function} cb The callback function
 */
function getQueueRecallInfo(hours, cid, qid, cb) {
  try {
    if (typeof cid !== 'string' ||
      typeof cb !== 'function' ||
      typeof qid !== 'string' ||
      typeof hours !== 'string') {

      throw new Error('wrong parameters');
    }
    compDbconn.getQueueRecallInfo({
        hours: hours,
        cid: cid,
        qid: qid,
        agents: compAstProxy.proxyLogic.getAgentsOfQueues([qid])
      },
      function (err, results) {
        cb(err, results);
      });
  } catch (error) {
    logger.log.error(IDLOG, error.stack);
    callback(error);
  }
}

exports.setLogger = setLogger;
exports.setCompDbconn = setCompDbconn;
exports.setCompAstProxy = setCompAstProxy;
exports.getQueueRecallInfo = getQueueRecallInfo;
exports.getRecallData = getRecallData;
exports.checkQueueRecallingStatus = checkQueueRecallingStatus;