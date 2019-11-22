package bean;

import point.PointBean;

import java.util.ArrayList;
import java.util.List;

public class UserHistory {
    private List listOfPoint;
    public UserHistory(){
        listOfPoint = new ArrayList<PointBean>();
    }
    public void addPoint(PointBean point){
        listOfPoint.add(point);
    }
    public List<PointBean> getListOfPoint(){
        return this.listOfPoint;
    }

}
