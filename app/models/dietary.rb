class Dietary < ApplicationRecord
    has_many :employee_dietaries
    has_many :employees, through: :employee_dietaries
    validates :dietary_type, uniqueness: {scope: :dietary_type}
    validates :dietary_type, presence: true
end
