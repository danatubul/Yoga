class Office < ApplicationRecord
    has_many :employees
    validates :office_name, uniqueness: {scope: :office_name}
    validates :office_name, presence: true
end
