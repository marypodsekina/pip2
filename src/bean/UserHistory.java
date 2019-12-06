package bean;

import point.PointBean;

import java.util.ArrayList;
import java.util.List;

public class UserHistory {
    private List<PointBean> listOfPoint;

    public UserHistory() {
        listOfPoint = new ArrayList<PointBean>();
    }

    public void addPoint(PointBean point) {
        listOfPoint.add(point);
    }

    public List<PointBean> getListOfPoint() {
        return listOfPoint;
    }

    public void clearHistory() {
        listOfPoint = new ArrayList<PointBean>();
    }
}
