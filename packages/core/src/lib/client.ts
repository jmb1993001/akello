import { EventTarget } from './event_target';
import { RegistryService } from './services/registry';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { UserService } from './services';
import { FinancialModelService } from './services/financial_model';
import { ReportsService } from './services/reports';
import { ClientStorage } from './storage';
import { Registry, PatientRegistry } from './models';


export const DEFAULT_BASE_URL = 'http://localhost:8000';

export interface AkelloClientInterface {
    login(
        username: string,
        password: string,
        onSuccess: (token: string) => void,
        onFail: (err: any) => void
    ): void;
    logout(): void;
    handleUnauthenticated(): void;
    getOptions(): AkelloClientOptions;
    getUserName(): string | undefined;
    confirmSignup(
        username: string,
        code: string,
        onSuccess: (result: any) => void,
        onFail: (err: any) => void
    ): void;
    resendCode(
        email: string,
        onSuccess: (result: any) => void,
        onFail: (err: any) => void
    ): void;
    signup(        
        given_name: string,
        family_name: string,
        username: string,
        password: string,
        onSuccess: (user: CognitoUser) => void,
        onFail: (err: any) => void
    ): void;
    selectRegistry(registry: Registry): void;
    getSelectedRegistry(): Registry | undefined;
    registryService: RegistryService;
    userService: UserService;
    financialService: FinancialModelService;
    reportsService: ReportsService;
    accessToken: string | undefined;
    
}

export interface AkelloClientOptions {
    baseUrl?: string;
    cognitoUserPoolId?: string;
    cognitoClientId?: string;
    cognitoEndpoint?: string;
    storage?: Storage;
    onUnauthenticated?: () => void;
}

export interface RequestParam {
    api_url: string;
    method: string;
    endpoint: string;
    token: string;
    payload?: any;
    onSuccess: (resp: any) => void;
    onFail?: (resp: any) => void;
}

export class AkelloClient extends EventTarget implements AkelloClientInterface {
    private readonly options: AkelloClientOptions;
    private username: string | undefined;
    private selectedRegistry: Registry | undefined
    private selectedPatientRegistry: PatientRegistry | undefined
    private readonly storage: ClientStorage;
    public readonly registryService: RegistryService;
    public readonly userService: UserService;
    public readonly financialService: FinancialModelService;
    public readonly reportsService: ReportsService;
    accessToken: string | undefined;

    /**
     * Creates a new instance of the AkelloClient class.
     * @param options - The options for configuring the AkelloClient.
     */
    constructor(options?: AkelloClientOptions) {
        super();
        this.options = options ?? {};
        this.registryService = new RegistryService(this);
        this.userService = new UserService(this);
        this.financialService = new FinancialModelService(this);
        this.reportsService = new ReportsService(this);
        this.storage = new ClientStorage(localStorage);
        this.accessToken = this.storage.getString('accessToken') ?? undefined;
        this.selectedRegistry = this.storage.getObject('selectedRegistry') ?? undefined;
        this.selectedPatientRegistry = this.storage.getObject('selectedPatientRegistry') ?? undefined;
    }


    selectRegistry(registry: Registry | undefined) {        
        this.selectedRegistry = registry;             
        this.storage.setObject('selectedRegistry', registry);
    }

    getSelectedRegistry(): Registry | undefined {
        return this.selectedRegistry;
    }

    selectPatient(patientRegistry: PatientRegistry | undefined) {
        this.selectedPatientRegistry = patientRegistry;    
        this.storage.setObject('selectedPatientRegistry', patientRegistry);
    }

    getSelectedPatientRegistry(): PatientRegistry | undefined {
        return this.selectedPatientRegistry;
    }

    /**
     * Retrieves the options for the client.
     *
     * @returns The options for the client.
     */
    getOptions() {
        return this.options;
    }

    /**
     * Returns the username.
     * @returns {string} The username.
     */
    getUserName(): string | undefined {
        return this.username;
    }

    setUserName(username: string) {
        this.username = username;
    }

    /**
     * Confirms the signup of a user with the provided username and confirmation code.
     *
     * @param username - The username of the user to confirm the signup for.
     * @param code - The confirmation code for the signup.
     * @param onSuccess - A callback function to be called when the signup confirmation is successful.
     * @param onFail - A callback function to be called when the signup confirmation fails.
     */
    confirmSignup(
        username: string,
        code: string,
        onSuccess: (result: any) => void,
        onFail: (err: any) => void
    ) {
        const poolData = {
            UserPoolId: this.options.cognitoUserPoolId!,
            ClientId: this.options.cognitoClientId!,
            endpoint: this.options.cognitoEndpoint!
        };
        const userPool = new CognitoUserPool(poolData);

        try {
            // Create a new user
            const user = new CognitoUser({ Pool: userPool, Username: username });

            user.confirmRegistration(code, false, (err, result) => {
                if (!err) {
                    this.username = username;
                    onSuccess(result);
                    this.dispatchEvent({ type: 'change' });
                } else {
                    onFail(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Resends the confirmation code to the specified email address.
     *
     * @param email - The email address to which the confirmation code should be sent.
     * @param onSuccess - A callback function that will be called if the confirmation code is successfully resent.
     *                    The function will receive the result as a parameter.
     * @param onFail - A callback function that will be called if there is an error while resending the confirmation code.
     *                 The function will receive the error as a parameter.
     */
    resendCode(
        email: string,
        onSuccess: (result: any) => void,
        onFail: (err: any) => void
    ) {
        const poolData = {
            UserPoolId: this.options.cognitoUserPoolId!,
            ClientId: this.options.cognitoClientId!,
            endpoint: this.options.cognitoEndpoint!
        };
        const userPool = new CognitoUserPool(poolData);

        try {
            // Create a new user
            const user = new CognitoUser({ Pool: userPool, Username: email });

            user.resendConfirmationCode((err, result) => {
                if (err) {
                    onFail(err);
                } else {
                    onSuccess(result);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Signs up a user with the provided username and password.
     *
     * @param given_name - The first name of the user to sign up.
     * @param family_name - The last name of the user to sign up.
     * @param username - The username of the user to sign up.
     * @param password - The password of the user to sign up.
     * @param onSuccess - A callback function that will be called when the user is successfully signed up. It will receive the signed up user as a parameter.
     * @param onFail - A callback function that will be called if there is an error during the sign up process. It will receive the error as a parameter.
     */
    signup(
        given_name: string,
        family_name: string,
        username: string,        
        password: string,
        onSuccess: (user: CognitoUser) => void,
        onFail: (err: any) => void
    ) {
        const poolData = {
            UserPoolId: this.options.cognitoUserPoolId!,
            ClientId: this.options.cognitoClientId!,
            endpoint: this.options.cognitoEndpoint!
        };
        const userPool = new CognitoUserPool(poolData);

        try {
            // Create a new user
            userPool.signUp(
                username,
                password,
                [
                    new CognitoUserAttribute({ Name: 'email', Value: username }),
                    new CognitoUserAttribute({ Name: 'given_name', Value: given_name }),
                    new CognitoUserAttribute({ Name: 'family_name', Value: family_name })
                ],
                [],
                (err, result) => {
                    if (err) {
                        onFail(err);            
                        return;
                    }
                    this.username = username;
                    onSuccess(result!.user);
                    this.dispatchEvent({ type: 'change' });
                }
            );
        } catch (error) {
            console.log(error);        
        }
    }

    /**
     * Logs in a user with the provided username and password.
     *
     * @param username - The username of the user.
     * @param password - The password of the user.
     * @param onSuccess - A callback function that will be called with the access token upon successful login.
     * @param onFail - A callback function that will be called with the error object upon login failure.
     */
    login(
        username: string,
        password: string,
        onSuccess: (token: string) => void,
        onFail: (err: any) => void
    ) {        
        const authenticationData = {
            Username: username,
            Password: password
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const poolData = {
            UserPoolId: this.options.cognitoUserPoolId!,
            ClientId: this.options.cognitoClientId!,
            endpoint: this.options.cognitoEndpoint!
        };        
        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool
        };        
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result: any) => {
                const accessToken = result.getAccessToken().getJwtToken();
                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
                const idToken = result.idToken.jwtToken;
                this.accessToken = accessToken;
                this.username = username;   
                
                this.userService.getUser((user) => {
                    this.dispatchEvent({ type: 'change' });
                    onSuccess(accessToken);
                    this.storage.setString('accessToken', accessToken);
                    //this.storage.setString('username', username);
                    //this.storage.setObject('user', user);
                })
                //onSuccess(accessToken);
                //this.storage.setString('accessToken', accessToken);
                //this.dispatchEvent({ type: 'change' });
            },
            onFailure: (err: any) => {
                this.accessToken = undefined;
                this.storage.clear();
                onFail(err);
            }
        });
    }

    /**
     * Logs out the user by clearing the access token and triggering the onUnauthenticated callback if provided.
     */
    logout() {
        this.accessToken = undefined;
        if (this.options.onUnauthenticated) {
            this.options.onUnauthenticated();
        }
        this.storage.clear();
    }

    /**
     * Handles the case when the user is unauthenticated.
     */
    handleUnauthenticated() {
        if (this.options.onUnauthenticated) {
            this.options.onUnauthenticated();
        }
        this.storage.clear();
    }
}