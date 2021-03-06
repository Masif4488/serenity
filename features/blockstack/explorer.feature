Feature: Account Creation
    Scenario: Account Creation
    Given load initial page
    # And set test-registrar.blockstack.org as API endpoint for ID registration
    And load create new ID page
    Then enter unique username
    Then enter password
    And wait for creating Blockstack ID spinner
    Then enter email
    And  expect recovery email to fail
    Then check username registration failed
    And acknowledge saving recovery key phrase
    Then wait for unlocking recovery key
    And get secret recovery key phrase
    Then perform recovery key phrase verification instructions
    And load main page as authenticated user

    Scenario:account-recovery-via-magic-recovery-code
    Given load browser page
    And load sign in page
    Then enter secret recovery key
    Then enter blockstack password
    And wait for Loading spinner
    Then enter blockstack email
    And wait for Restoring your Blockstack ID
    Then load main page for authenticated user

    Scenario:account-recovery-via-secret-key
    Given load browser initial page
    And load browser sign in page
    Then enter blockstack secret recovery key
    And create blockstack password
    Then enter blockstack browser email
    Then wait for blockstack Restoring your Blockstack ID
    And load blockstack main page as authenticated user

    Scenario:login-to-hello-blockstack-app
    Given load browser blockstack initial page
    And load app list
    Then fast account recovery via localStorage update
    And load page
    Then set blockstack auth host
    # And click login button
    And wait for auth page to load
    Then click allow auth button
    And ensure logged into hello-blockstack app
    Then validate blockstack user data
    Then validate blockstack encryptContent and blockstack decryptContent with account key
    And validate blockstack encryptContent and blockstack decryptContent and with specified keys
    Then validate blockstack getAppBucketUrl
    And validate blockstack putFile
    And validate blockstack getFile
    Then validate blockstack listFiles
    Then validate blockstack getUserAppFileUrl
    And validate blockstack getFile with multi-player storage
    Then validate blockstack signUserOut
    And validate localStorage user data is been cleared