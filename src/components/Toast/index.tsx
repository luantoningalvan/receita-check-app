import { CheckCircle } from "phosphor-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ToastMessage, { BaseToast } from "react-native-toast-message";

export function Toast() {
  return (
    <ToastMessage
      config={{
        success: (props) => (
          <BaseToast
            {...props}
            renderLeadingIcon={() => (
              <CheckCircle
                size={32}
                color="#fff"
                style={{
                  marginTop: 14,
                  marginLeft: 16,
                }}
              />
            )}
            text1Style={{
              color: "#fff",
              fontWeight: "normal",
              fontSize: RFValue(14),
              marginLeft: -12,
            }}
            style={{
              backgroundColor: "#3bc651",
              borderLeftWidth: 0,
            }}
          />
        ),
      }}
    />
  );
}
