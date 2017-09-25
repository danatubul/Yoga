class EmployeeDietary < ApplicationRecord
    belongs_to :employee
    belongs_to :dietary
    validates :employee_id, uniqueness: {scope: :dietary_id}
    validates :dietary_id, presence: true
    validates :employee_id, presence: true
    validate :employee_id_exists
    validate :dietary_id_exists

    def employee_id_exists
        if Employee.find_by_id(self.employee_id).nil?
            then errors.add(:employee_id, "employee_id foreign key must exist")
        end
    end
    def dietary_id_exists
        if Dietary.find_by_id(self.dietary_id).nil?
            then errors.add(:dietary_id, "dietary_id foreign key must exist")
        end
    end
end
