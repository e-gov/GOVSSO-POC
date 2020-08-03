package ee.ria.tara.sso.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenInfo {

    private String idToken;

}
