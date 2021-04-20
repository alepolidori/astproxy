/**
 * @module astproxy
 * @submodule plugins_event_13
 */
var AST_TRUNK_REG_2_STR_ADAPTER = require('../proxy_logic_13/trunk_reg_adapter_13.js').AST_TRUNK_REG_2_STR_ADAPTER;

/**
 * The module identifier used by the logger.
 *
 * @property IDLOG
 * @type string
 * @private
 * @final
 * @readOnly
 * @default [peerStatus]
 */
var IDLOG = '[peerStatus]';

/**
 * The asterisk proxy.
 *
 * @property astProxy
 * @type object
 * @private
 */
var astProxy;

(function() {

  /**
   * The logger. It must have at least three methods: _info, warn and error._
   *
   * @property logger
   * @type object
   * @private
   * @default console
   */
  var logger = console;

  try {

    /**
     * The plugin that handles the PeerStatus event.
     *
     * @class peerStatus
     * @static
     */
    var peerStatus = {
      /**
       * It's called from _astproxy_ component for each
       * PeerStatus event received from the asterisk.
       *
       * @method data
       * @param {object} data The asterisk event data
       * @static
       */
      data: function(data) {
        try {

          if (data.peer && data.peerstatus &&
            data.event === 'PeerStatus') {

            logger.info(IDLOG, 'received event ' + data.event);
            astProxy.proxyLogic.evtPeerStatusChanged(data.peer, "AAAAA");

          } else {
            logger.warn(IDLOG, 'PeerStatus event not recognized');
          }

        } catch (err) {
          logger.error(IDLOG, err.stack);
        }
      },

      /**
       * Set the logger to be used.
       *
       * @method setLogger
       * @param {object} log The logger object. It must have at least
       * three methods: _info, warn and error_
       * @static
       */
      setLogger: function(log) {
        try {
          if (typeof log === 'object' &&
            typeof log.info === 'function' &&
            typeof log.warn === 'function' &&
            typeof log.error === 'function') {

            logger = log;
          } else {
            throw new Error('wrong logger object');
          }
        } catch (err) {
          logger.error(IDLOG, err.stack);
        }
      },

      /**
       * Store the asterisk proxy to visit.
       *
       * @method visit
       * @param {object} ap The asterisk proxy module.
       */
      visit: function(ap) {
        try {
          // check parameter
          if (!ap || typeof ap !== 'object') {
            throw new Error('wrong parameter');
          }
          astProxy = ap;
        } catch (err) {
          logger.error(IDLOG, err.stack);
        }
      }
    };

    // public interface
    exports.data = peerStatus.data;
    exports.visit = peerStatus.visit;
    exports.setLogger = peerStatus.setLogger;

  } catch (err) {
    logger.error(IDLOG, err.stack);
  }
})();
