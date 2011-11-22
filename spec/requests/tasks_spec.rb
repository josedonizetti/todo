require "spec_helper"

describe "workding with tasks", :js => true do

    it "creating a task" do
      email = "teste@example.com"
      password = "123456"
      u = User.new(:email => email, :password => password, :password_cofirmation => password)
      u.save!

      visit "/"
      fill_in "user_email", :with => email
      fill_in "user_password", :with => password
      click_button "Sign in"

      fill_in "description", :with => "creating a task"
      #looks like it is a bad idea, and I should always have a submit button on the clink and put it out of view with css, serach about
      find_field('description').native.send_key(:enter)
      page.should have_content "creating a task"
    end
end
