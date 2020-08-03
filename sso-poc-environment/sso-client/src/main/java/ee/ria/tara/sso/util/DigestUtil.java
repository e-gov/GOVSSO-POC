package ee.ria.tara.sso.util;

import lombok.experimental.UtilityClass;
import org.apache.commons.codec.binary.Base64;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@UtilityClass
public class DigestUtil {

    public static String getSha256String(String input) {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        return Base64.encodeBase64String(digest.digest(input.getBytes(StandardCharsets.UTF_8)));
    }


}
