##################################################################################
#
# This is just a demo controller, that will help you at the initial setup.
# Once you are ready for real developemt, Please remove it an implament your own controllers.
#
##################################################################################
class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def getEmployees
    # result = {:all => Employee.all.order("first_name ASC"),:count => Employee.all.count} 
    # result = {:all => Employee.select("*").joins(:office).where("employees.office_id is not null").all.order("first_name ASC"),:count => Employee.all.count} 
    
    result = {:all => Employee.select("employees.*,offices.office_name").joins(:office).where("employees.office_id = offices.id").all.order("first_name ASC"),:count => Employee.all.count} 
    
    render :json => result
  end

  def getDietaries
    # ans = {:all => EmployeeDietary.select("*").joins(:dietary).where("employee_dietaries.dietary_id is not null").all} 
     ans = {:all => EmployeeDietary.select("*").joins(:dietary).where("employee_dietaries.dietary_id is not null").all,:count => EmployeeDietary.all.count}
     render :json => ans
  end

end
