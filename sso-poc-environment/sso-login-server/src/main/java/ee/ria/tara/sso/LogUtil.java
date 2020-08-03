package ee.ria.tara.sso;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogUtil {

    private static final Logger LOG = LoggerFactory.getLogger(LogUtil.class);

    public static String asJsonString(Object object) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            LOG.warn("Exception occurred when trying to convert object to json. Returning 'null' instead.", e);
            return "null";
        }
    }
}
