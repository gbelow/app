import { StyleSheet, Dimensions } from "react-native";
import theme from "../../const/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.loginBackgroundColor,
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  dropdown_2: {
    alignSelf: 'flex-end',
    width: 80,
    margin: 5,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'white',
    textAlign:'center',
    paddingVertical: 10,
    
  },
  dropdown_2_text: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    width:'100%',
    height: 40,
  },
  dropdown_2_dropdown: {
    width: 80,
    borderColor: 'gray',
    borderRadius: 3,
  },
  dropdown_2_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown_2_image: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
  },
  dropdown_2_separator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22
  // },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
    // borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default styles;
