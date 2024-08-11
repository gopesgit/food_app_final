import { StyleSheet } from "react-native"

export const colors = {
    primary: "#ff8c52",
    scenodry: "#fff",
    grey1: "#86939e",
    grey2: "#e1e8ee"
    // buttons: "#ff8c52",
    // grey1: "#43484d",
    // grey2: "#5e6977",
    // grey3: "#86939e",
    // grey4: "#bdc6cf",
    // grey5: "#e1e8ee",
    // CardComment: "#86939e",
    // cardbackground: "white",
    // hedertext: "#EAF0F1",
    // borderI: '#86939e',
}
export const parameters = {
    headerTitle: 20,
    borderRaduis: 12,
    titlefont: 18,
    subtitle: 15,
    // headerHeight: 40,
    // titlefont: 25,
    // titlefont1: 20,
    // titlefontB: 30,
    // subtitle: 15,
    // borderR1: 12,
}

export const globalStyle = StyleSheet.create({
    //welcome Screen
    welcomeScreenHeader: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingTop: 25,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    welcomeScreenSlider: {
        flex: 4,
        paddingHorizontal: 10,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    slider: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: parameters.borderRaduis,
    },
    slideImage: {
        height: "100%",
        width: "100%",
        objectFit: 'cover',
        borderRadius: parameters.borderRaduis,
    },
    welcomeScreenFooter: {
        flex: 2,
        justifyContent: 'flex-start',
        paddingBottom: 25
    },
    //welcome screen
    //login screen
    header: {
        paddingTop: 30,
        flexDirection: 'row',
        backgroundColor: colors.primary,
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    controlWrapper: {
        marginHorizontal: 10,
        marginVertical: 8,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: colors.grey1,
        marginHorizontal: 10,
        marginVertical: 8,
        borderRadius: parameters.borderRaduis,
        //alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputPassword: {
        height: 40,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey1,
        marginHorizontal: 10,
        marginVertical: 8,
        paddingHorizontal: 8,
        borderRadius: parameters.borderRaduis,
        //alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centeritem: {
        alignItems: 'center',
        margin: 'auto',
        gap: 4,
    },
    headerTitle: {
        fontSize: parameters.headerTitle,
        color: colors.primary,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    headerText: {
        color: colors.scenodry,
        fontSize: parameters.headerTitle,
        fontWeight: 'bold',
    },
    title: {
        fontSize: parameters.titlefont,
        color: colors.primary,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: parameters.subtitle,
        color: colors.grey1,
    },
    subtitlelink: {
        fontSize: parameters.subtitle,
        color: colors.grey1,
        textDecorationLine: 'underline',
    },
    textOverlayTop: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability
        color: '#fff',
        padding: 5,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: parameters.borderRaduis - 5,
    },
    textOverlayBottom: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability
        color: '#fff',
        padding: 5,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: parameters.borderRaduis - 5,
    },
    menu: {
        marginHorizontal: 2,
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 2,
        //width:90,
        backgroundColor: 'rgba(255,255,255,0.9)'

    },


    primaryBtn: {
        borderRadius: parameters.borderRaduis,
        marginVertical: 8,
        marginHorizontal: 8,
        backgroundColor: colors.primary,
    },
    primaryBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.scenodry,
    },
    secondaryBtn: {
        borderRadius: parameters.borderRaduis,
        borderWidth: 1,
        marginVertical: 8,
        marginHorizontal: 8,
        borderColor: "#000",
        backgroundColor: colors.scenodry,
    },
    secondaryBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000",
    },
    socialicon: {
        borderRadius: parameters.borderRaduis,
        marginHorizontal: 8,
        marginVertical: 8,
    },
    homeContainer: {
        flex: 1,
        backgroundColor: "#fff"
        // justifyContent:'center',
        // alignItems:'center'
    },
    twoelementholder: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        alignItems: 'center',

    },
    activeBtn: {
        paddingHorizontal: 25,
        paddingVertical: 5,
        backgroundColor: colors.primary,
        borderRadius: 15,
    },
    deactiveBtn: {
        paddingHorizontal: 25,
        borderRadius: 15,
        paddingVertical: 5,
        backgroundColor: colors.grey1,
    },
    buttonTextSM: {
        fontSize: 16,
        color: "#fff",
        fontWeight: 'bold'
    },
    locationwapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginVertical: 4,
        borderRadius: parameters.borderRaduis,
        borderWidth: 1,
        marginHorizontal: 8,
        borderColor: "#ddd",
        // borderBottomWidth:1,
        // borderTopWidth:1,
        height: 40,
        backgroundColor: "#fff",
    },
    locationwapperInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    divheder: {
        //alignItems: 'center',
        //backgroundColor:colors.grey2,
        marginVertical: 4,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: parameters.borderRaduis - 5,
        borderWidth: 1,
        marginHorizontal: 8,
        borderColor: "#ddd",
        backgroundColor: "#008b07",
        // borderColor:"#ddd",
        // borderBottomWidth:1,
        // borderTopWidth:1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    divhederText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#efefef'
    },
    divhederWhite: {
        alignItems: 'center',
        //backgroundColor: colors.scenodry,
        // marginVertical: 8,
        //paddingVertical: 8,
        marginHorizontal: 2,
        borderRadius: 12
    },
    smallCard: {
        borderRadius: 12,
        //backgroundColor:"#e1e8ee",
        backgroundColor: "#fff",
        //backgroundColor:"rgba(115,190,246,0.2)",
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 5,
        width: 100,
        marginHorizontal: 4,
        height: 110,
        borderColor: "#fff",
        borderWidth: .5,
        ///
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,

    },
    smallCardSelected: {
        borderRadius: 12,
        //backgroundColor:"#e1e8ee",
        backgroundColor: "rgba(115,190,246,0.4)",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: 100,
        marginHorizontal: 3,
        height: 110,
        borderColor: "#73bef6",
        borderWidth: .5,


    },
    roundImage: {
        width: '99.9%',
        height: '85%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        //borderRadius: 10,
        marginTop: 0,
        izeMode: 'cover',


    },
    textInputMulti: {
        height: 90,
        borderWidth: 1,
        borderColor: colors.grey1,
        marginVertical: 4,
        borderRadius: parameters.borderRaduis,
        textAlignVertical: 'top', 
        padding:parameters.borderRaduis,        
    },
    textInputSingle: {
        height: 40,
        borderWidth: 1,
        borderColor: colors.grey1,
        marginVertical: 4,
        borderRadius: parameters.borderRaduis,
        textAlignVertical: 'top', 
        padding:parameters.borderRaduis,        
    },



})