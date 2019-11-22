package point;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import static java.lang.Math.pow;

public class PointBean implements Serializable {
    boolean isInArea;
    private Date date;
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    public PointBean(){};
    public PointBean(BigDecimal x, BigDecimal y, BigDecimal r, int time){
        this.x=x;
        this.y=y;
        this.r=r;
        date = new Date();
        date = new Date(date.getTime()-3*1000*60*60-time*1000*60);
        isInArea=(((y.compareTo(new BigDecimal("0"))>=0)&&(x.compareTo(new BigDecimal("0"))<=0)&&(y.compareTo(r)<=0)&&(x.compareTo(r.multiply(new BigDecimal("-1")))>=0))||(((x.multiply(x).add(y.multiply(y))).compareTo(r.multiply(r))<=0)&&(x.compareTo(new BigDecimal("0"))>=0)&&(y.compareTo(new BigDecimal("0"))<=0))||((x.compareTo(new BigDecimal("0"))>=0)&&(y.compareTo(new BigDecimal("0"))>=0)&&(y.compareTo(r.subtract(x))<=0)));
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    public BigDecimal getY() {
        return y;
    }

    public BigDecimal getX() {
        return x;
    }

    public BigDecimal getR() {
        return r;
    }

    @Override
    public String toString() {
        return "x: "+x+", y: "+y+", r: "+r;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }

        PointBean that = (PointBean) obj;

        if ((x != that.x) || (y != that.y) || (r != that.r)) {
            return false;
        }
        return true;
    }
    public String isInArea(){
        return isInArea ? "Yes" : "No";
    }

    public void setInArea(boolean inArea) {
        isInArea = inArea;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }
}
