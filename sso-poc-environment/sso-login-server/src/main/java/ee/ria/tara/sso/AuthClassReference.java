package ee.ria.tara.sso;

import java.util.Collections;
import java.util.List;

public enum AuthClassReference {

    HIGH(2, List.of("mid", "smartid", "idcard")),
    SUBSTANTIAL(1, Collections.EMPTY_LIST),
    LOW(0, List.of("banklink"));

    private int rank;
    private List<String> defaultAmrValues;

    AuthClassReference(int rank, List<String> defaultAmrValues) {
        this.rank = rank;
        this.defaultAmrValues = defaultAmrValues;
    }

    public static AuthClassReference getByAmr(String amr) {
        if (amr == null) {
            return null;
        }
        for (AuthClassReference acr : AuthClassReference.values()) {
            if (acr.defaultAmrValues.contains(amr.toLowerCase())) {
                return acr;
            }
        }
        return null;
    }

    public int getRank() {
        return this.rank;
    }

}
