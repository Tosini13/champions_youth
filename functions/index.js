const admin = require('firebase-admin');
const firebase_tools = require('firebase-tools');
const functions = require('firebase-functions');

admin.initializeApp();


/**
 * Callable function that creates a custom auth token with the
 * custom attribute "admin" set to true.
 * 
 * See https://firebase.google.com/docs/auth/admin/create-custom-tokens
 * for more information on creating custom tokens.
 * 
 * @param {string} data.uid the user UID to set on the token.
 */
exports.mintAdminToken = functions.https.onCall(async (data, context) => {
  const uid = data.uid;

  const token = await admin
    .auth()
    .createCustomToken(uid, { admin: true });

  return { token };
});

// [START recursive_delete_function]
/**
 * Initiate a recursive delete of documents at a given path.
 * 
 * The calling user must be authenticated and have the custom "admin" attribute
 * set to true on the auth token.
 * 
 * This delete is NOT an atomic operation and it's possible
 * that it may fail after only deleting some documents.
 * 
 * @param {string} data.path the document or collection path to delete.
 */
exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  })
  .https.onCall(async (data, context) => {
    // Only allow admin users to execute this function.
    console.log('context.auth.token', context.auth.token);
    console.log('context.auth.token.admin', context.auth.token.admin);
    if (!(context.auth && context.auth.token)) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Must be an administrative user to initiate delete.'
      );
    }

    const path = data.path;
    console.log(
      `User ${context.auth.uid} has requested to delete path ${path}`
    );
    console.log('functions.config().fb.token', functions.config().fb.token);
    console.log('process.env.GCLOUD_PROJECT', process.env.GCLOUD_PROJECT);
    console.log('path', path);
    //1//0chZ-hIjjiDpCCgYIARAAGAwSNwF-L9IrsgQP4l3dZaYrCU_GMzux3ek3Ojc9RKaOnjZF49hMf5gf42_Lp559scD6fWomkJNLvKA
    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    await firebase_tools.firestore
      .delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: '1//0chZ-hIjjiDpCCgYIARAAGAwSNwF-L9IrsgQP4l3dZaYrCU_GMzux3ek3Ojc9RKaOnjZF49hMf5gf42_Lp559scD6fWomkJNLvKA'
      });

    return {
      path: path
    };
  });
// [END recursive_delete_function]